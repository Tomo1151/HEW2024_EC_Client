import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Post from "@/components/Post";
import { fetchBaseURL } from "@/config/fetchConfig";

const Timeline = ({ name, isActive, refresh }) => {
  const [posts, setPosts] = useState([]);
  const [latestPostId, setLatestPostId] = useState("");
  const fetchPosts = async () => {
    console.log(refresh);
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
      if (!isActive) return;
      await fetchPosts();
    })();
  }, [isActive, refresh]);

  return (
    <>
      <Button variant="contained" onClick={fetchPosts} fullWidth>
        Load More
      </Button>
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
