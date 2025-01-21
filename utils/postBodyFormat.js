import React from "react";
import { extractUrlsFromPost } from "./extractUrlsFromPost";

export const formatPostBody = (content) => {
  const urls = extractUrlsFromPost(content);

  // 連続する改行を1つにまとめる
  const normalizedContent = content.replace(/(\r?\n){3,}/g, "\n");

  // 各行を処理し、URLをリンクに変換
  const lines = normalizedContent.split("\n");
  const formattedLines = lines.map((line) => {
    // 行内のテキストを分割して処理
    const segments = [];
    let lastIndex = 0;

    urls.forEach((url) => {
      const index = line.indexOf(url, lastIndex);
      if (index !== -1) {
        // URL前のテキストを追加
        if (index > lastIndex) {
          segments.push(line.substring(lastIndex, index));
        }
        // URLをリンクとして追加
        segments.push(
          React.createElement(
            "a",
            {
              key: url,
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "text-blue-500 hover:underline z-10 relative break-all break-words inline-block max-w-full",
              onClick: (e) => e.stopPropagation(),
              style: {
                wordBreak: "break-all",
                overflowWrap: "break-word",
              },
            },
            url
          )
        );
        lastIndex = index + url.length;
      }
    });

    // 残りのテキストを追加
    if (lastIndex < line.length) {
      segments.push(line.substring(lastIndex));
    }

    return segments;
  });

  // 改行で区切られた行を結合して返す
  return formattedLines.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));
};
