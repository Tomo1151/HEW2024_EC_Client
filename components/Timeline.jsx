import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Post from "@/components/Post";
import { useAuthContext } from "@/context/AuthContext";

const Timeline = ({ name, isActive, setRefresh, refresh }) => {
  const { refreshToken } = useAuthContext();
  const [posts, setPosts] = useState([]);
  console.log(process.env.NEXT_PUBLIC_FETCH_BASE_URL);

  const getLatestPostId = () => {
    if (posts.length === 0) return "";
    return posts[posts.length - 1].id;
  };

  const fetchPosts = async () => {
    try {
      refreshToken().then(async () => {
        const query = {
          tagName: name,
          after: getLatestPostId(),
        };
        const params = new URLSearchParams(query);
        const response = await fetch(
          process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/posts?" + params,
          {
            credentials: "include",
          }
        );
        const resJson = await response.json();

        console.log(`FETCH: ${name}`);

        if (resJson.success) {
          if (resJson.data.length === 0) return;
          const newPosts = resJson.data;
          const latestId = newPosts[newPosts.length - 1].id;
          setPosts((prev) => {
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
      {posts.toReversed().map((post) => (
        <Post
          key={post.id}
          type={post.type}
          repost_user={post?.repost_user || undefined}
          postId={post?.postId || post.id}
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
          setPosts={setPosts}
          setRefresh={setRefresh}
        />
      ))}
    </>
  );
};

export default Timeline;
