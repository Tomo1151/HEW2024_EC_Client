"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";

import { fetchHeaders } from "@/config/fetchConfig";
import { useUserContext } from "../context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";

const Post = ({
  type,
  repost_user,
  postId,
  username,
  nickname,
  icon_link,
  content,
  images,
  comment_count,
  ref_count,
  like_count,
  created_at,
  is_reposted,
  is_liked,
  is_clickable = true,
  setPosts,
  setRefresh,
}) => {
  const { activeUser } = useUserContext();
  const [isReposted, setisReposted] = useState(is_reposted);
  const [isLiked, setisLiked] = useState(is_liked);
  const [repostCount, setRepostCount] = useState(ref_count);
  const [likeCount, setLikeCount] = useState(like_count);
  const notifications = useNotifications();

  const router = useRouter();

  let options = {};
  if (activeUser && activeUser.username === username) {
    options = {
      通報: () => {
        console.log("ポストを通報");
      },
      削除: async () => {
        console.log(`ポストを削除: ${postId}`);
        await deletePost();
      },
    };
  } else {
    options = {
      通報: () => {
        console.log("ポストを通報");
      },
    };
  }

  const deletePost = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/posts/${postId}`,
        {
          method: "DELETE",
          headers: fetchHeaders,
          credentials: "include",
        }
      );
      const resJson = await response.json();

      if (resJson.success) {
        if (!setRefresh) {
          notifications.show("ポストが正常に削除されました", {
            severity: "success",
            autoHideDuration: 3000,
          });
          router.back();
          return;
        }
        if (!setPosts) {
          setRefresh((prev) => !prev);
          notifications.show("ポストが正常に削除されました", {
            severity: "success",
            autoHideDuration: 3000,
          });
          return;
        }
        setPosts((prev) =>
          prev.filter((post) => {
            if (post.type === "post") {
              return post.id !== postId;
            } else if (post.type === "repost") {
              return post.postId !== postId;
            }
          })
        );
        setRefresh((prev) => !prev);
        notifications.show("ポストが正常に削除されました", {
          severity: "success",
          autoHideDuration: 3000,
        });
      } else {
        notifications.show("ポストの削除に失敗しました", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setisLiked(is_liked);
  }, [is_liked]);

  useEffect(() => {
    setisReposted(is_reposted);
  }, [is_reposted]);

  useEffect(() => {
    setRepostCount(ref_count);
  }, [ref_count]);

  return (
    <section
      style={{ borderBottom: "1px solid #f0f0f0" }}
      className={`relative bg-white mb-[2px] p-8 ${is_clickable ? "hover:brightness-[.95] duration-200" : ""}`}
    >
      {is_clickable && (
        <Link
          href={`/posts/${postId}`}
          className="absolute inset-0 w-full h-full z-[1]"
        />
      )}
      {type === "repost" && (
        <p className="font-bold pb-4 text-gray-300">
          {repost_user.nickname || repost_user.username}がリポストしました
        </p>
      )}
      <div className="flex relative">
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0, zIndex: "19" }}
          onClick={handleClick}
        >
          <MoreHorizRounded sx={{ fontSize: 30 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
        >
          {Object.keys(options).map((key) => (
            <MenuItem
              key={key}
              onClick={() => {
                options[key]();
                handleClose();
              }}
            >
              {key}
            </MenuItem>
          ))}
        </Menu>
        <div className="shrink-0">
          <Link
            href={`/users/${username}`}
            scroll={false}
            className="relative h-fit hover:brightness-[.75] rounded-full duration-200 z-10"
          >
            <Box sx={{ width: "50px", height: "50px", mr: 2 }}>
              <Image
                src={
                  icon_link
                    ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${icon_link}`
                    : "https://placeholder.com/150"
                }
                width="50"
                height="50"
                className="rounded-full object-cover w-full h-full"
                alt="ユーザーアイコン"
              />
            </Box>
          </Link>
        </div>
        <div className="px-2 grow">
          <div>
            <Link
              href={`/users/${username}`}
              className="relative font-bold hover:underline tracking-[.075em] z-10"
              scroll={false}
            >
              {nickname || username}
            </Link>
            <p className="select-none font-bold opacity-35">
              {new Date(created_at).toLocaleString("ja-JP")}
            </p>
          </div>
          <p className="mt-2 pb-2">{content}</p>
          {images?.length > 0 && <PostImageContainer images={images} />}

          <PostReaction
            postId={postId}
            comment_count={comment_count}
            ref_count={repostCount}
            setRepostCount={setRepostCount}
            like_count={likeCount}
            setLikeCount={setLikeCount}
            is_reposted={isReposted}
            setReposted={setisReposted}
            is_liked={isLiked}
            setLiked={setisLiked}
            setPosts={setPosts}
            setRefresh={setRefresh}
          />
        </div>
      </div>
    </section>
  );
};

export default Post;
