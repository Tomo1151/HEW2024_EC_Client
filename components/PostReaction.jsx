import { useRouter } from "next/navigation";

import { Box } from "@mui/material";
import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  RepeatRounded,
} from "@mui/icons-material";

import { useAuthContext } from "@/context/AuthContext";
import { fetchHeaders } from "@/config/fetchConfig";

const PostReaction = ({
  postId,
  comment_count,
  ref_count,
  setRepostCount,
  is_reposted,
  setReposted,
  like_count,
  setLikeCount,
  setLiked,
  is_liked,
  setPosts,
  setRefresh,
}) => {
  const { activeUser, refreshToken } = useAuthContext();
  const router = useRouter();

  const reaction = {
    repost: {
      method: is_reposted ? "DELETE" : "POST",
      count: is_reposted ? -1 : 1,
      setState: setReposted,
      setCount: setRepostCount,
    },
    like: {
      method: is_liked ? "DELETE" : "POST",
      count: is_liked ? -1 : 1,
      setState: setLiked,
      setCount: setLikeCount,
    },
  };

  const handleReaction = async (type) => {
    if (!activeUser) {
      router.push("/login", { scroll: false });
      return;
    }

    try {
      refreshToken().then(async () => {
        await fetch(
          process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${postId}/${type}`,
          {
            method: reaction[type].method,
            headers: fetchHeaders,
            credentials: "include",
          }
        );
        reaction[type].setState((prev) => !prev);
        reaction[type].setCount((prev) => prev + reaction[type].count);
        if (type === "repost" && setPosts) {
          if (is_reposted) {
            console.log(activeUser);
            setPosts((prev) =>
              prev
                .filter((post) => post.postId !== postId)
                .map((post) => {
                  if (post.id === postId) {
                    return {
                      ...post,
                      ref_count: post.ref_count - 1,
                      reposts: post.reposts.filter(
                        (repost) => repost.userId !== activeUser.id
                      ),
                    };
                  }
                  return post;
                })
            );
          } else {
            setPosts((prev) =>
              prev.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    ref_count: post.ref_count + 1,
                    reposts: [{ userId: activeUser.id }, ...post.reposts],
                  };
                }
                return post;
              })
            );
          }
        }

        if (setRefresh) setRefresh((prev) => !prev);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", pt: 8, columnGap: 8 }}>
      <Box
        sx={{
          fontSize: "1.15em",
          userSelect: "none",
          transitionDuration: "0.15s",
          zIndex: 20,
          "&:hover": {
            color: "#68b5ff",
            filter: "drop-shadow(0 0 0.5rem #68b5ff)",
            cursor: "pointer",
          },
        }}
      >
        <ChatBubbleOutlineRounded sx={{ fontSize: "1.25em", mr: 1.5 }} />
        {comment_count || 0}
      </Box>
      <Box
        sx={[
          {
            fontSize: "1.15em",
            userSelect: "none",
            transitionDuration: "0.15s",
            zIndex: 20,
            "&:hover": {
              color: "#2dcb2d",
              filter: "drop-shadow(0 0 0.5rem #2dcb2d)",
              cursor: "pointer",
            },
          },
          is_reposted && {
            color: "#2dcb2d",
          },
        ]}
        onClick={handleReaction.bind(null, "repost")}
      >
        <RepeatRounded sx={{ fontSize: "1.25em", mr: 1.5, mb: 0.175 }} />
        {ref_count || 0}
      </Box>
      <Box
        sx={[
          {
            fontSize: "1.15em",
            userSelect: "none",
            transitionDuration: "0.15s",
            zIndex: 20,
            "&:hover": {
              color: "red",
              filter: "drop-shadow(0 0 0.5rem red)",
              cursor: "pointer",
            },
          },
          is_liked && { color: "red" },
        ]}
        onClick={handleReaction.bind(null, "like")}
      >
        {is_liked ? (
          <FavoriteRounded sx={{ fontSize: "1.25em", mr: 1.5, mb: 0.175 }} />
        ) : (
          <FavoriteBorderRounded
            sx={{ fontSize: "1.25em", mr: 1.5, mb: 0.175 }}
          />
        )}
        {like_count}
      </Box>
    </Box>
  );
};

export default PostReaction;
