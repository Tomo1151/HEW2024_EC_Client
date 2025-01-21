import { NextResponse } from "next/server";

export async function GET(req) {
  // URLからogptagを取得
  const searchParams = req.nextUrl.searchParams;
  const res = await fetch(searchParams.get("url"));
  const text = await res.text();
  const ogpTag = text.match(
    /<meta property="og:[\u0000-\u0019\u0021-\uFFFF]+" content="[\u0000-\u0019\u0021-\uFFFF]+"\/>/gu
  );

  // dictに変換
  const ogpDict = {};
  ogpTag &&
    ogpTag.forEach((tag) => {
      const index = tag.match(
        /(?<=property="og:)[\u0000-\u0019\u0021-\uFFFF]+(?=")/
      )[0];
      const data = tag.match(
        /(?<=content=")[\u0000-\u0019\u0021-\uFFFF]+(?=")/
      )[0];
      ogpDict[index] = data;
    });

  return NextResponse.json(ogpDict);
}
