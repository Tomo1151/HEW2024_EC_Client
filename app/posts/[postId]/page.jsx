"use client";

import Post from "@/components/Post";
import React, { useEffect, useState } from "react";

const PostDetail = (route) => {
  const [postData, setPostData] = useState(null);

  const fetchPostById = async (postId) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${postId}`,
        {
          credentials: "include",
        }
      );
      const resJson = await response.json();

      console.log(`FETCH: ${name}`);

      if (resJson.success) {
        const posts = resJson.data;
        console.dir(posts);
        setPostData(posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPostById(route.params.postId);
    })();
  }, []);

  return (
    postData && (
      <Post
        type="post"
        postId={postData.id}
        username={postData.author.username}
        nickname={postData.author.nickname}
        icon_link={postData.author.icon_link}
        content={postData.content}
        image_link={postData.image_link}
        comment_count={postData.comment_count}
        ref_count={postData.ref_count}
        like_count={postData.like_count}
        created_at={postData.created_at}
        is_reposted={postData.reposts.length > 0}
        is_liked={postData.likes.length > 0}
        is_clickable={false}
        setPosts={null}
        setRefresh={null}
      />
    )
  );
};

export default PostDetail;
