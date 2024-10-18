"use client";

import { useEffect, useState } from "react";
import { useTabContext } from "@/context/TabContext";
import { fetchBaseURL } from "@/config/fetchConfig";
import Post from "@/components/Post";

const Timeline = ({ name, isActive }) => {
  const { activeTab, tabContents } = useTabContext();
  const [posts, setPosts] = useState([]);
  const fetchPosts = async (latest) => {
    try {
      const response = await fetch(fetchBaseURL + "/posts");
      const resJson = await response.json();

      if (resJson.success) {
        setPosts((prev) => prev.concat(...resJson.data));
      }
    } catch (err) {
      console.log("e");
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      console.log(tabContents[activeTab]);
      await fetchPosts();
    })();
  }, []);

  return (
    <>
      {/* {name}
      <button onClick={fetchPosts}>fetch</button> */}
      {isActive &&
        posts.map((post, idx) => (
          <Post
            key={idx}
            username={post.author.username}
            nickname={post.author.nickname}
            icon_link={post.author.icon_link}
            content={post.content}
            created_at={post.created_at}
          />
        ))}
      {/* <Post content={tabContents[activeTab]} />
      <Post content={tabContents[activeTab]} />
      <Post content={tabContents[activeTab]} />
      <Post content={tabContents[activeTab]} /> */}
    </>
  );
};

export default Timeline;
