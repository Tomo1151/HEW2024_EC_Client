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
      <Box className="m-[3rem]">
        <h1 className="text-3xl">ライブ出品とは？</h1>
        <br />
        <p>
          Youtubeのサービスを利用して実際に作っている様子を配信しながら出品をすることができるサービスです。商品サムネイルの代わりに、設定したYoutubeの埋め込みが表示されます。
        </p>
        <Box className="my-[2rem] py-[2rem] border-t border-gray-300">
          <h2 className="text-2xl">ライブ配信をする</h2>
          <ol className="list-decimal list-outside ml-[1.5rem]">
            <li className="mt-[2rem]">
              Youtubeの場合は共有ボタンを押して作成されるURLをコピーします
              Twitchの場合はユーザーページのURLをコピーします
              <Image
                src="/live_help/share.png"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                alt="ユーザーアイコン"
              />
            </li>
            <li className="mt-[2rem]">
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
      </Box>
    </ThemeProvider>
  );
};

export default liveHelp;
