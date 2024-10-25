"use client";

import Post from "@/components/Post";
import React, { useEffect, useState } from "react";
import { fetchBaseURL } from "@/config/fetchConfig";

const PostDetail = (route) => {
  const [postData, setPostData] = useState(null);

  const fetchPostById = async (postId) => {
    try {
      const response = await fetch(fetchBaseURL + `/posts/${postId}`, {
        credentials: "include",
      });
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
        postId={postData.id}
        username={postData.author.username}
        nickname={postData.author.nickname}
        icon_link={postData.author.icon_link}
        content={postData.content}
        comment_count={postData.comment_count}
        ref_count={postData.ref_count}
        like_count={postData.like_count}
        created_at={postData.created_at}
        is_liked={postData.likes.length > 0}
        is_clickable={false}
      />
    )
  );
};

export default PostDetail;
