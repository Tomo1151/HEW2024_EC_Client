import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // URLからogptagを取得
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get("url");
    const res = await fetch(url);
    const text = await res.text();

    // メタタグを抽出する正規表現
    const ogpTag = text.match(
      /<meta[^>]*(?:property|name)="og:[^"]*"[^>]*content="[^"]*"[^>]*>/gi
    );

    // dictに変換
    const ogpDict = {};
    ogpTag &&
      ogpTag.forEach((tag) => {
        const index = tag.match(/(?:property|name)="og:([\w:]+)"/i)[1];
        const data = tag.match(/content="([^"]*)"/i)[1];

        // URLエンコードされた文字列を適切にデコード
        try {
          ogpDict[index] = decodeURIComponent(data);
        } catch {
          // デコードに失敗した場合は元の値を使用
          ogpDict[index] = data;
        }
      });

    console.log(ogpDict);

    return NextResponse.json(ogpDict);
  } catch (error) {
    console.error("OGP fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch OGP data" },
      { status: 500 }
    );
  }
}

/*
https://qiita-user-contents.imgix.net/https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-afbab5eb44e0b055cce1258705637a91.png?ixlib=rb-4.0.0&w=1200&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLXByb2ZpbGUtaW1hZ2VzLmltZ2l4Lm5ldC9odHRwcyUzQSUyRiUyRnFpaXRhLWltYWdlLXN0b3JlLnMzLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb20lMkYwJTJGMjMzNjY3JTJGcHJvZmlsZS1pbWFnZXMlMkYxNjA4NTQzMTU4P2l4bGliPXJiLTQuMC4wJmFyPTElM0ExJmZpdD1jcm9wJm1hc2s9ZWxsaXBzZSZmbT1wbmczMiZzPTgzMThlNDY0MDM2M2YwOGU5OTdmNDc2OGY4ZTEyNzcx&blend-x=120&blend-y=467&blend-w=82&blend-h=82&blend-mode=normal&s=33e66a1678286eed31123dd4929f3f16?ixlib=rb-4.0.0&amp;w=1200&amp;fm=jpg&amp;mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTk2MCZoPTMyNCZ0eHQ9JUU4JUFBJUE0JUU4JUE3JUEzJUUzJTgxJTk1JUUzJTgyJThDJUUzJTgxJThDJUUzJTgxJUExJUUzJTgxJUFBbmV2ZXIlRTUlOUUlOEIlRTMlODElQUUlRTUlOEQlQjElRTklOTklQkElRTYlODAlQTclM0ElMjAlRTMlODAlOEMlRTUlQUQlOTglRTUlOUMlQTglRTMlODElOTclRTMlODElQUElRTMlODElODQlRTMlODAlOEQlRTMlODElQUIlRTMlODElQTQlRTMlODElODQlRTMlODElQTYmdHh0LWFsaWduPWxlZnQlMkN0b3AmdHh0LWNvbG9yPSUyMzFFMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtcGFkPTAmcz0xN2MxZWRmMmVhZjcyYjZmYmYzNjVkZjMwYzkzNDA3Yw&amp;mark-x=120&amp;mark-y=112&amp;blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTgzOCZoPTU4JnR4dD0lNDB1aHlvJnR4dC1jb2xvcj0lMjMxRTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LXBhZD0wJnM9OGNlNjBjZTc2NjZmOWExMjZkZWI5ZmUxYzA0NzNlN2I&amp;blend-x=242&amp;blend-y=480&amp;blend-w=838&amp;blend-h=46&amp;blend-fit=crop&amp;blend-crop=left,bottom&amp;blend-mode=normal&amp;s=a1d8c49b95f37de64338c28134ac41be
*/
