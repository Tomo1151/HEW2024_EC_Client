import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Post from "@/components/Post";
import { fetchBaseURL } from "@/config/fetchConfig";
import { useAuthContext } from "@/context/AuthContext";

const Timeline = ({ name, isActive, setRefresh, refresh }) => {
  const [posts, setPosts] = useState([]);
  const [latestPostId, setLatestPostId] = useState("");
  const { refreshToken } = useAuthContext();
  const fetchPosts = async () => {
    try {
      refreshToken().then(async () => {
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
          console.log(newPosts);
          const latestId = newPosts[newPosts.length - 1].id;
          setPosts((prev) => {
            setLatestPostId(latestId);
            return prev.concat(...newPosts);
          });
        }
      });
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
      {posts.toReversed().map((post, index) => (
        <Post
          key={`${post.id}${index}`}
          type={post.type}
          repost_user={post?.repost_user || undefined}
          postId={post.id}
          username={post.author.username}
          nickname={post.author.nickname}
          icon_link={post.author.icon_link}
          content={post.content}
          comment_count={post.comment_count}
          ref_count={post.ref_count}
          like_count={post.like_count}
          created_at={post.created_at}
          is_reposted={post.reposts.length > 0}
          is_liked={post.likes.length > 0}
          setRefresh={setRefresh}
        />
      ))}
    </>
  );
};

export default Timeline;
