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
          Origin: "http://localhost:3001",
        },
      }
    );
    const resJson = await response.json();

    if (response.status === 404) {
      // setPostData(null);
    }

    if (resJson.success) {
      const posts = resJson.data;
      console.log(posts);
      return {
        title: posts.product ? posts.product.name : posts.content,
        description: posts.author.nickname || posts.author.username,
      };
      // setPostData(posts);
    }
  } catch (err) {
    console.log(err);
  }

  return {
    title: "投稿ページ",
    // title: post.author.nickname || post.author.username,
    // description: post.content,
  };
}

export default PostDetailLayout;
