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
  is_reposted,
  like_count,
  is_liked,
  setRefresh,
}) => {
  const [isReposted, setisReposted] = useState(is_reposted);
  const [repostCount, setRepostCount] = useState(ref_count);
  const [isLiked, setisLiked] = useState(is_liked);
  const [likeCount, setLikeCount] = useState(like_count);
  const { refreshToken } = useAuthContext();

  const reaction = {
    repost: {
      method: isReposted ? "DELETE" : "POST",
      count: isReposted ? -1 : 1,
      setState: setisReposted,
      setCount: setRepostCount,
    },
    like: {
      method: isLiked ? "DELETE" : "POST",
      count: isLiked ? -1 : 1,
      setState: setisLiked,
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
          isReposted && {
            color: "#2dcb2d",
          },
        ]}
        onClick={handleReaction.bind(null, "repost")}
      >
        <RepeatRounded sx={{ fontSize: "1.25em", mr: 1.5, mb: 0.175 }} />
        {repostCount || 0}
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
        onClick={handleReaction.bind(null, "like")}
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
