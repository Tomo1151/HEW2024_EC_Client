import { headers } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const imageUrl = searchParams.get("url");
    const host = headers().get("host");
    const fetchDest = headers().get("sec-fetch-dest");

    console.log("Host: ", host);
    console.log("Dest: ", fetchDest);

    if (fetchDest !== "image") {
      return new Response("Invalid request", { status: 400 });
    }

    if (!imageUrl) {
      return new Response("Image URL is required", { status: 400 });
    }

    // 画像リクエストをプロキシ
    const response = await fetch(imageUrl, {
      headers: {
        Origin: `http://${host}`,
      },
    });

    if (!response.ok) {
      return new Response("Failed to fetch image", { status: response.status });
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.startsWith("image/")) {
      return new Response("Invalid image format", { status: 400 });
    }

    // レスポンスを返却
    const buffer = await response.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
