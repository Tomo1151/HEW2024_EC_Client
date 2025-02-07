import { useState } from "react";
import { useRouter } from "next/navigation";

import { Box, Tooltip, Menu, MenuItem } from "@mui/material";
import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  RepeatRounded,
  EditNoteRounded,
} from "@mui/icons-material";

import { useUserContext } from "@/context/UserContext";
import { fetchHeaders } from "@/config/fetchConfig";
import Link from "next/link";
import { countFormat } from "@/utils/countFormat";

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
  quote_count,
  is_preview,
  setPosts,
  setRefresh,
}) => {
  const { activeUser, refreshToken } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    if (is_preview) return;
    if (!activeUser) {
      router.push("/login", { scroll: false });
      return;
    }

    // console.log(type);

    try {
      refreshToken().then(async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${postId}/${type}`,
          {
            method: reaction[type].method,
            headers: fetchHeaders,
            credentials: "include",
          }
        );
        reaction[type].setState((prev) => !prev);
        reaction[type].setCount((prev) => prev + reaction[type].count);
        const resJson = await response.json();

        if (resJson.success) {
          if (type === "like") {
            if (setPosts)
              setPosts((prev) => {
                return prev.map((post) => {
                  if (
                    post.id === resJson.data.ref.id ||
                    post.postId === resJson.data.ref.id
                  ) {
                    return {
                      ...post,
                      like_count: resJson.data.ref.like_count,
                      likes: resJson.data.ref.likes,
                    };
                  }
                  return post;
                });
              });
          }

          if (type === "repost" && is_reposted) {
            if (setPosts)
              setPosts((prev) =>
                prev
                  .filter(
                    (post) =>
                      !(
                        post.postId === postId &&
                        post.repost_user.id === activeUser.id
                      )
                  )
                  .map((post) => {
                    // console.log(post);
                    if (
                      post.id === resJson.data.ref.id ||
                      post.postId === resJson.data.ref.id
                    ) {
                      return post.type === "repost"
                        ? {
                            ...post,
                            ref_count: resJson.data.ref.ref_count,
                            reposts: resJson.data.ref.reposts,
                          }
                        : resJson.data.ref;
                    }
                    return post;
                  })
              );
          } else if (type === "repost" && !is_reposted) {
            if (setPosts)
              setPosts((prev) =>
                prev.map((post) => {
                  // console.log(post);
                  if (
                    post.id === resJson.data.ref.id ||
                    post.postId === resJson.data.ref.id
                  ) {
                    return post.type === "repost"
                      ? {
                          ...post,
                          ref_count: resJson.data.ref.ref_count,
                          reposts: resJson.data.ref.reposts,
                        }
                      : resJson.data.ref;
                  }
                  return post;
                })
              );
          }

          if (setRefresh) setRefresh((prev) => !prev);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        pt: "1em",
        justifyContent: { xs: "space-between", sm: "flex-start" },
        // columnGap: { xs: 0, sm: "6em" },
        mr: { xs: 2, sm: 0 },
      }}
    >
      <Tooltip title="コメント">
        <Box
          sx={{
            fontSize: "1.15em",
            userSelect: "none",
            transitionDuration: "0.15s",
            flexBasis: "33%",
            zIndex: 20,
            "&:hover": {
              color: "#68b5ff",
              filter: "drop-shadow(0 0 0.5rem #68b5ff)",
              cursor: "pointer",
            },
          }}
        >
          {is_preview ? (
            <>
              <ChatBubbleOutlineRounded
                sx={{ fontSize: "1.25em", mr: { xs: 0.25, sm: ".5em" } }}
              />
              {countFormat(comment_count)}
            </>
          ) : (
            <Link href={`/posts/${postId}`} className="z-0" scroll={false}>
              <Box component="span" sx={{ display: "inline-block" }}>
                <ChatBubbleOutlineRounded
                  sx={{ fontSize: "1.25em", mr: { xs: 0.25, sm: ".5em" } }}
                />
                {countFormat(comment_count)}
              </Box>
            </Link>
          )}
        </Box>
      </Tooltip>
      <Tooltip title="リポスト">
        <Box
          sx={[
            {
              fontSize: "1.15em",
              userSelect: "none",
              transitionDuration: "0.15s",
              zIndex: 20,
              flexBasis: "33%",
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
          <RepeatRounded
            sx={{
              fontSize: "1.25em",
              mr: { xs: 0.25, sm: ".5em" },
              mb: { xs: ".0875em", sm: ".0875em" },
            }}
          />
          {countFormat(ref_count)}
        </Box>
      </Tooltip>
      <Tooltip title="いいね">
        <Box
          sx={[
            {
              fontSize: "1.15em",
              userSelect: "none",
              transitionDuration: "0.15s",
              zIndex: 20,
              flexBasis: "33%",
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
            <FavoriteRounded
              sx={{
                fontSize: "1.25em",
                mr: { xs: 0.25, sm: ".5em" },
                mb: { xs: ".0875em", sm: ".0875em" },
              }}
            />
          ) : (
            <FavoriteBorderRounded
              sx={{
                fontSize: "1.25em",
                mr: { xs: 0.25, sm: ".5em" },
                mb: { xs: ".0875em", sm: ".0875em" },
              }}
            />
          )}
          {countFormat(like_count)}
        </Box>
      </Tooltip>
      <Tooltip title="引用リポスト">
        <Box
          sx={[
            {
              fontSize: "1.15em",
              userSelect: "none",
              transitionDuration: "0.15s",
              zIndex: 20,
              flexBasis: "33%",
              "&:hover": {
                color: "#2dcb2d",
                filter: "drop-shadow(0 0 0.5rem #2dcb2d)",
                cursor: "pointer",
              },
            },
          ]}
        >
          {is_preview ? (
            <Box component="span" sx={{ display: "inline-block" }}>
              <EditNoteRounded
                sx={{
                  position: "relative",
                  top: -1,
                  fontSize: "1.5em",
                  mr: { xs: 0.25, sm: ".5em" },
                }}
              />
              {countFormat(quote_count)}
            </Box>
          ) : (
            // <Link href={`/post?quote=${postId}`} className="z-0" scroll={false}>
            <Box component="span" sx={{ display: "inline-block" }}>
              <EditNoteRounded
                sx={{
                  position: "relative",
                  top: -1,
                  fontSize: "1.5em",
                  mr: { xs: 0.25, sm: ".5em" },
                }}
                onClick={handleClick}
              />
              {countFormat(quote_count)}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    router.push(`/post?quote=${postId}`);
                    handleClose();
                  }}
                >
                  引用リポスト
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push(`/posts/${postId}/quotes`);
                    handleClose();
                  }}
                >
                  引用を見る
                </MenuItem>
              </Menu>
            </Box>
            // </Link>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default PostReaction;
