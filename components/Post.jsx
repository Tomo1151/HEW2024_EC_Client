"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

import { Box, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

import { fetchHeaders } from "@/config/fetchConfig";
import { useUserContext } from "../context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";

import PostTags from "./PostTags";
import { urlForImage } from "@/utils/utils";
import { dateFormat } from "@/utils/dateFormat";
import { formatPostBody } from "@/utils/postBodyFormat";
import { PostOgp } from "./PostOgp";
import { extractUrlsFromPost } from "@/utils/extractUrlsFromPost";
import QuoteCard from "./QuoteCard";

const Post = ({
  type,
  repost_user,
  postId,
  username,
  nickname,
  is_superuser,
  icon_link,
  content,
  images,
  tags,
  comment_count,
  ref_count,
  like_count,
  quote_count,
  quoted_ref,
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
  if (
    activeUser &&
    (activeUser.username === username || activeUser.is_superuser)
  ) {
    options = {
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
    setLikeCount(like_count);
  }, [like_count]);

  useEffect(() => {
    setisReposted(is_reposted);
  }, [is_reposted]);

  useEffect(() => {
    setRepostCount(ref_count);
  }, [ref_count]);

  const firstUrl = extractUrlsFromPost(content)[0];
  // console.log(activeUser);

  return (
    <Box
      id={type === "reply" ? postId : null}
      component="section"
      sx={{ borderBottom: "1px solid #f0f0f0" }}
      className={`relative bg-white mb-[2px] p-4 sm:p-8 ${is_clickable ? "hover:brightness-[.95] duration-200" : ""}`}
    >
      {is_clickable && (
        <Link
          href={`/posts/${postId}`}
          className="absolute inset-0 w-full h-full z-[1] pointer-events-auto"
        />
      )}
      {type === "repost" && (
        <p className="font-bold pb-4 text-gray-300">
          {repost_user.nickname || repost_user.username}がリポストしました
        </p>
      )}
      <div className="flex relative w-full overflow-hidden">
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0, zIndex: "19" }}
          onClick={handleClick}
        >
          <MoreHorizRounded />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
            // scroll={false}
            className="relative h-fit hover:brightness-[.75] rounded-full duration-200 z-10"
          >
            <Box
              sx={{
                width: { xs: "2.5em", sm: "50px" },
                height: { xs: "2.5em", sm: "50px" },
                mr: { xs: 0, sm: "1em" },
              }}
            >
              <Image
                src={urlForImage(icon_link)}
                width="50"
                height="50"
                className="rounded-full object-cover w-full h-full"
                alt="ユーザーアイコン"
              />
            </Box>
          </Link>
        </div>
        <div className="px-2 grow w-full overflow-hidden">
          <div>
            <Link
              href={`/users/${username}`}
              className="relative font-bold hover:underline tracking-[.075em] z-10"
              // scroll={false}
            >
              {nickname || username}
              {is_superuser && (
                <Tooltip title="管理者" placement="top">
                  <VerifiedRoundedIcon
                    sx={{
                      fontSize: "1.25em",
                      color: "gold",
                      mb: 0.5,
                      ml: 0.5,
                    }}
                  />
                </Tooltip>
              )}
            </Link>
            <p className="select-none font-bold opacity-35">
              {dateFormat(new Date(created_at))}
            </p>
          </div>
          <p className="mt-2 pb-2">{formatPostBody(content)}</p>

          <PostTags tags={tags} />

          {images?.length > 0 && <PostImageContainer images={images} />}

          {/* URLが存在する場合のみOGPカードを表示 */}
          {firstUrl && <PostOgp url={firstUrl} />}

          {quoted_ref && (
            <QuoteCard
              image_link={
                quoted_ref.images?.length > 0 &&
                urlForImage(quoted_ref.images[0].image_link, "images")
              }
              author_name={
                quoted_ref.author.nickname || quoted_ref.author.username
              }
              author_icon={urlForImage(quoted_ref.author.icon_link, "icons")}
              post_content={formatPostBody(quoted_ref.content, false)}
              post_link={`/posts/${quoted_ref.id}`}
              product={quoted_ref.product}
              target="_self"
            />
          )}

          <PostReaction
            postId={postId}
            comment_count={comment_count}
            ref_count={repostCount}
            setRepostCount={setRepostCount}
            like_count={likeCount}
            quote_count={quote_count}
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
    </Box>
  );
};

export default Post;
