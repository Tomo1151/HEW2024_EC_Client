import { headers } from "next/headers";

const PostDetailLayout = ({ children }) => {
  return <>{children}</>;
};

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${params.postId}`,
      {
        // credentials: "include",
        headers: {
          Origin:
            process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001",
        },
      }
    );
    const resJson = await response.json();

    if (response.status === 404) {
      // setPostData(null);
    }

    if (resJson.success) {
      const posts = resJson.data;
      // console.log(posts);
      return {
        title: posts.product
          ? `${posts.product.name} | Miseba`
          : `${posts.content} | Miseba`,
        description: posts.author.nickname || posts.author.username,
        metadataBase: new URL(`https://${headers().get("host")}`),
        keywords:
          "作品販売, 作品, クリエイター, 販売, イラスト, デザイン, 作家",
      };
      // setPostData(posts);
    }
  } catch (err) {
    console.log(err);
  }

  return {
    title: "投稿ページ",
    metadataBase: new URL(`https://${headers().get("host")}`),
    // title: post.author.nickname || post.author.username,
    // description: post.content,
  };
}

export default PostDetailLayout;
