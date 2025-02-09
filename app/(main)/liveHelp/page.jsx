"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, ThemeProvider } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";

const liveHelp = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">ヘルプ</h3>
      </MainColumnHeader>
      <Box className="m-[2rem]">
        <h1 className="text-3xl">ライブ出品とは？</h1>
        <br />
        <p>
          Youtubeのサービスを利用して実際に作っている様子を配信しながら出品をすることができるサービスです。商品サムネイルの変わりに設定したYoutubeの埋め込みがされます。
        </p>
        <br />
        <h2 className="text-2xl">ライブ配信をする</h2>
        <br />
        <ol className="list-decimal list-inside">
          <li>
            Youtubeの場合は共有ボタンを押して作成されるURLをコピーします
            <Image
              src="/live_help/share.png"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              alt="ユーザーアイコン"
            />
          </li>
          <br />
          <li>
            ライブ出品モードに変更し「ライブURL」の項目に入力して、出品します
            <Image
              src="/live_help/new_post.png"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              alt="ユーザーアイコン"
            />
          </li>
        </ol>
      </Box>
    </ThemeProvider>
  );
};

export default liveHelp;
