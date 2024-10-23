"use client";

import { useEffect, useState } from "react";
// import { useTabContext } from "@/context/TabContext";
import { fetchBaseURL } from "@/config/fetchConfig";
import Post from "@/components/Post";

const Timeline = ({ name, isActive }) => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async (latest) => {
    try {
      const response = await fetch(fetchBaseURL + `/posts?tagName=${name}`);
      const resJson = await response.json();

      console.log(`FETCH: ${name}`);

      if (resJson.success) {
        setPosts((prev) => prev.concat(...resJson.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isActive) return;
      await fetchPosts();
    })();
  }, [isActive]);

  return (
    <>
      {isActive &&
        posts.map((post, idx) => (
          <Post
            key={idx}
            username={post.author.username}
            nickname={post.author.nickname}
            icon_link={post.author.icon_link}
            content={post.content}
            comment_count={post.comment_count}
            ref_count={post.ref_count}
            like_count={post.like_count}
            created_at={post.created_at}
          />
        ))}
    </>
  );
};

export default Timeline;
