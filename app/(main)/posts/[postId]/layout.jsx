const PostDetailLayout = ({ children }) => {
  return <>{children}</>;
};

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${params.postId}`,
      {
        // credentials: "include",
      }
    );
    //   const resJson = await response.json();

    //   if (response.status === 404) {
    //     // setPostData(null);
    //   }

    //   if (resJson.success) {
    //     const posts = resJson.data;
    //     console.log(posts);
    //     // setPostData(posts);
    //   }
  } catch (err) {
    console.log(err);
  }

  return {
    title: "Post",
    // title: post.author.nickname || post.author.username,
    // description: post.content,
  };
}

export default PostDetailLayout;
