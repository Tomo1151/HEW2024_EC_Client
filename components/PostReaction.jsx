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
  like_count,
  is_liked,
}) => {
  const [isLiked, setisLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(like_count);
  const { refreshToken } = useAuthContext();

  const like = async () => {
    try {
      refreshToken().then(async () => {
        await fetch(fetchBaseURL + `/posts/${postId}/like`, {
          method: "POST",
          headers: fetchHeaders,
          credentials: "include",
        });
        setLikeCount((prev) => prev + 1);
        setisLiked(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const dislike = async () => {
    try {
      refreshToken().then(async () => {
        await fetch(fetchBaseURL + `/posts/${postId}/like`, {
          method: "DELETE",
          credentials: "include",
        });
        setLikeCount((prev) => prev - 1);
        setisLiked(false);
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
        sx={{
          fontSize: "1.15em",
          userSelect: "none",
          transitionDuration: "0.15s",
          zIndex: 20,
          "&:hover": {
            color: "#2dcb2d",
            filter: "drop-shadow(0 0 0.5rem #2dcb2d)",
            cursor: "pointer",
          },
        }}
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
          isLiked && { color: "red" },
        ]}
        onClick={isLiked ? dislike : like}
      >
        {isLiked ? (
          <FavoriteRounded sx={{ fontSize: "1.25em", mr: 1.5, mb: 0.175 }} />
        ) : (
          <FavoriteBorderRounded
            sx={{ fontSize: "1.25em", mr: 1.5, mb: 0.175 }}
          />
        )}
        {likeCount}
      </Box>
    </Box>
  );
};

export default PostReaction;
