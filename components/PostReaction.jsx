import { useState } from "react";

import { Box } from "@mui/material";
import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  RepeatRounded,
} from "@mui/icons-material";

import { useAuthContext } from "@/context/AuthContext";
import { fetchBaseURL, fetchHeaders } from "@/config/fetchConfig";

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
  setRefresh,
}) => {
  const { refreshToken } = useAuthContext();

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
    try {
      refreshToken().then(async () => {
        await fetch(fetchBaseURL + `/posts/${postId}/${type}`, {
          method: reaction[type].method,
          headers: fetchHeaders,
          credentials: "include",
        });
        reaction[type].setState((prev) => !prev);
        reaction[type].setCount((prev) => prev + reaction[type].count);
        setRefresh((prev) => !prev);
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
