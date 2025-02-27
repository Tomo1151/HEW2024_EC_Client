import Image from "next/image";
import { Box, Container } from "@mui/material";

const LiveHelpPage = () => {
  return (
    <Container
      component="main"
      sx={{
        // fontFamily: "monospace",
        backgroundColor: "white",
        maxWidth: "800px",
        my: { xs: 0, sm: "2em" },
        p: { xs: "1em", sm: "1em 2.5em" },
        mx: "auto",
        borderRadius: "0.375em",
        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
      }}
      className="patch"
    >
      <Box className="m-[3rem]">
        <h1 className="text-3xl">ライブ出品とは？</h1>
        <br />
        <p>
          YouTube Live や Twitch
          のサービスを利用して出品物の制作風景を配信しながら投稿を公開することができる出品方法です。
          <br />
          この出品方法では、商品データ/商品サムネイル画像/値段を決定せずに出品することができます。
          <br />
          商品サムネイル画像の代わりにライブ配信画面の埋め込みプレイヤーが表示されます。
        </p>
        <Box className="my-[2rem] py-[2rem] border-t border-gray-300">
          <h2 className="text-2xl">ライブ配信をする</h2>
          <ol className="list-decimal list-outside ml-[1.5rem]">
            <li className="mt-[2rem]">
              Youtubeの場合は共有ボタンを押して作成されるURLをコピーします
              <br />
              Twitchの場合はユーザーページのURLをコピーします
              <Image
                src="/live_help/share.png"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
                alt="ユーザーアイコン"
              />
            </li>
            <li className="mt-[2rem]">
              ライブ出品モードに変更し「ライブURL」の項目に入力して、出品します
              <Image
                src="/live_help/new_post.png"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
                alt="ユーザーアイコン"
              />
            </li>
          </ol>
        </Box>
      </Box>
    </Container>
  );
};

export async function generateMetadata() {
  return {
    title: `ライブ出品 - ヘルプ | Miseba`,
    description: "Misebaのライブ出品についてのヘルプページ",
  };
}

export default LiveHelpPage;
