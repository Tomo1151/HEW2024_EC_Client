"use client";

import { useEffect, useState } from "react";
import { fetchBaseURL } from "@/config/fetchConfig";
import Post from "@/components/Post";

const Timeline = ({ name, isActive }) => {
  const [posts, setPosts] = useState([]);
  const [latestPostId, setLatestPostId] = useState("");
  const fetchPosts = async () => {
    try {
      const query = {
        tagName: name,
        after: latestPostId,
      };
      const params = new URLSearchParams(query);
      const response = await fetch(fetchBaseURL + "/posts?" + params, {
        credentials: "include",
      });
      const resJson = await response.json();

      console.log(`FETCH: ${name}`);

      if (resJson.success) {
        if (resJson.data.length === 0) return;
        const newPosts = resJson.data;
        const latestId = newPosts[newPosts.length - 1].id;
        setPosts((prev) => {
          setLatestPostId(latestId);
          return prev.concat(...newPosts);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      // console.log("name", name, isActive);
      if (!isActive) return;
      await fetchPosts();
    })();
  }, [isActive]);

  return (
    <>
      {posts.toReversed().map((post, idx) => (
        <Post
          key={idx}
          postId={post.id}
          username={post.author.username}
          nickname={post.author.nickname}
          icon_link={post.author.icon_link}
          content={post.content}
          comment_count={post.comment_count}
          ref_count={post.ref_count}
          like_count={post.like_count}
          created_at={post.created_at}
          is_liked={post.likes.length > 0}
        />
      ))}
    </>
  );
};

export default Timeline;
