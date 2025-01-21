import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // URLからogptagを取得
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");
    const res = await fetch(url);
    const text = (await res.text()).split("</head>")[0];

    // メタタグを抽出する正規表現
    const ogpTag = text.match(
      /<meta[^>]*(?:property|name)="(?:og:|twitter:)[^"]*"[^>]*content="[^"]*"[^>]*>/gi
    );

    // dictに変換
    const ogpDict = {};
    ogpTag &&
      ogpTag.forEach((tag) => {
        const index = tag.match(
          /(?:property|name)="(?:og:|twitter:)([\w:]+)"/i
        )[1];
        const data = tag.match(/content="([^"]*)"/i)[1];

        ogpDict[index] = data;
      });

    ogpDict.image = ogpDict.image.replace(/&amp;/g, "&");

    return NextResponse.json(ogpDict);
  } catch (error) {
    console.error("OGP fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch OGP data" },
      { status: 500 }
    );
  }
}
