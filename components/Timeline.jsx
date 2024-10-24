"use client";

import { useEffect, useState } from "react";
// import { useTabContext } from "@/context/TabContext";
import { fetchBaseURL } from "@/config/fetchConfig";
import Post from "@/components/Post";

const Timeline = ({ name, isActive }) => {
  const [posts, setPosts] = useState([]);
  const [latestPostId, setLatestPostId] = useState(null);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        fetchBaseURL + `/posts?tagName=${name}&after=${latestPostId}`,
        {
          credentials: "include",
        }
      );
      const resJson = await response.json();

      console.log(`FETCH: ${name}`);

      if (resJson.success) {
        const posts = resJson.data;
        console.dir(posts);
        setPosts((prev) => prev.concat(...posts));
        setLatestPostId(posts[posts.length - 1].id);
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
        posts
          .toReversed()
          .map((post, idx) => (
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
