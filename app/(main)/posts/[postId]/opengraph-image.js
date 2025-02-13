import { formatPostBody } from "@/utils/postBodyFormat";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const runtime = "edge";
export const alt = "投稿画像";

async function loadGoogleFont(text) {
  const encodedText = encodeURIComponent(text);
  const url = `https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap&text=${encodedText}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }
  throw new Error("Failed to fetch font resource");
}

async function getPostData(postId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/posts/${postId}`,
    {
      headers: {
        Origin: process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001",
      },
    }
  );
  const post = (await res.json()).data;

  console.dir(post.author, { depth: null });

  return {
    username: post.author.username,
    nickname: post.author.nickname,
    icon: post.author.icon_link,
    content: post.product ? post.product.name : post.content,
    image: post?.images[0],
  };
}

export default async function Image({ params }) {
  const post = await getPostData(params.postId);
  const CONTENT_LENGTH = post.image ? 20 : 70;
  const username = post.nickname || post.username;
  const content = post.content;
  console.log("fonts requested: ", (username + content).replace(/\s/g, ""));
  // post.content.length > CONTENT_LENGTH
  //   ? post.content.slice(0, CONTENT_LENGTH) + "..."
  //   : post.content;
  const image = post.image;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          padding: "40px",
          fontFamily: "M PLUS Rounded 1c",
          backgroundImage:
            "linear-gradient(90deg, rgba(109, 201, 101, 1), rgba(209, 254, 236, 1))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 50,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            backgroundImage: `url("${process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001"}/miseba_logo_icon_bg.png")`,
            backgroundSize: "225px 225px",
            backgroundPosition: "center",
            // fontFamily: "M PLUS Rounded 1c",
            width: "100%",
            height: "100%",
            borderRadius: ".375em",
            boxShadow: "-2px 5px 15px 0px rgba(143, 143, 143, 0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "40px",
              columnGap: image ? "40px" : 0,
              paddingBottom: "40px",
            }}
          >
            {image && (
              <img
                alt="投稿画像"
                src={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/images/${image.image_link}`}
                width={250}
                height={250}
                style={{
                  // aspectRatio: "square",
                  objectFit: "cover",
                  width: "250px",
                  height: "250px",
                  borderRadius: ".375em",
                }}
              />
            )}
            {/* imageがないときにURLがはみ出る */}
            <p
              // tw="line-clamp-3"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                rowGap: 0,
                margin: 0,
                padding: 0,
                lineHight: "1px",
                width: "100%",
                height: "250px",
                flexGrow: 1,
                lineBreak: "anywhere",
                overflowWrap: "break-word",
                wordBreak: "break-all",
                lineClamp: 3,
              }}
            >
              {content}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "20px",
              width: "100%",
              padding: "0 1em",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "65%",
                overflow: "hidden",
                flexGrow: 1,
              }}
            >
              <img
                alt="ユーザーアイコン"
                src={
                  post.icon
                    ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${post.icon}`
                    : `${process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001"}/whitehuman.svg`
                }
                width={80}
                height={80}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "100%",
                  margin: "20px",
                }}
              />
              <p
                style={{
                  fontSize: 36,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {username}
              </p>
            </div>
            <img
              src={`${process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001"}/miseba_logo_image_ogp.png`}
              alt="アプリロゴ"
              width={300}
              height={100}
              style={{
                flexShrink: 0,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "M PLUS Rounded 1c",
          data: await loadGoogleFont((username + content).replace(/\s/g, "")),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
