import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";

import PostReaction from "./PostReaction";

import { fetchHeaders } from "@/config/fetchConfig";
import { useAuthContext } from "../context/AuthContext";
import { useNotifications } from "@toolpad/core/useNotifications";

const Post = ({
  type,
  repost_user,
  postId,
  username,
  nickname,
  icon_link,
  content,
  image_link,
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
  const { activeUser } = useAuthContext();
  const [isReposted, setisReposted] = useState(is_reposted);
  const [isLiked, setisLiked] = useState(is_liked);
  const [repostCount, setRepostCount] = useState(ref_count);
  const [likeCount, setLikeCount] = useState(like_count);
  const notifications = useNotifications();

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
      }
    } catch (error) {
      notifications.show("ポストの削除に失敗しました", {
        severity: "error",
        autoHideDuration: 3000,
      });
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
    setisReposted(is_reposted);
  }, [is_reposted]);

  useEffect(() => {
    setRepostCount(ref_count);
  }, [ref_count]);

  return (
    <section
      className={`relative bg-white my-8 p-8 rounded-md ${is_clickable && "hover:brightness-[.95] duration-200"}`}
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
            className="relative h-fit hover:brightness-[.75] rounded-full duration-200 z-10"
          >
            <Image
              src={icon_link || "https://placeholder.com/150"}
              width="50"
              height="50"
              className="rounded-full mr-4"
              alt="ユーザーアイコン"
            />
          </Link>
        </div>
        <div className="px-2 grow">
          <div>
            <Link
              href={`/users/${username}`}
              className="relative font-bold hover:underline tracking-[.075em] z-10"
            >
              {nickname || username}
            </Link>
            <p className="select-none font-bold opacity-35">
              {new Date(created_at).toLocaleString("ja-JP")}
            </p>
          </div>
          <p className="mt-2 pb-2">{content}</p>
          {image_link && (
            <Link
              href={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}${image_link}`}
              className="relative z-10"
            >
              <div className="mt-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}${image_link}`}
                  width={1920}
                  height={1080}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  className="rounded-md"
                  alt="投稿画像"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </Link>
          )}
          {/* {type === "post" && ( */}
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
          {/* )} */}
        </div>
      </div>
    </section>
  );
};

export default Post;
