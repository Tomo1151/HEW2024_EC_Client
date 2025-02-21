"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";

import { fetchHeaders } from "@/config/fetchConfig";
import { useUserContext } from "../context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import PostTags from "./PostTags";
import QuoteCard from "./QuoteCard";

import { formatPostBody } from "@/utils/postBodyFormat";
import { extractLiveIdentifier, urlForImage } from "@/utils/utils";
import { dateFormat } from "@/utils/dateFormat";
import { formatPrice } from "@/utils/formatPrice";
import LiveEmbedCard from "./LiveEmbedCard";
import StarRating from "./StarRating";

const Product = ({
  type,
  repost_user,
  id,
  postId,
  username,
  nickname,
  icon_link,
  name,
  price,
  rating,
  images,
  tags,
  live_link,
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
      編集: () => {
        console.log("ポストを編集");
        router.push(`/posts/${postId}/edit`);
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
    setisReposted(is_reposted);
  }, [is_reposted]);

  useEffect(() => {
    setRepostCount(ref_count);
  }, [ref_count]);

  return (
    <Box component="section">
      <div
        className={`relative w-full bg-white mb-[2px] p-4 sm:p-8 ${is_clickable ? "hover:brightness-[.95] duration-200" : ""}`}
        style={{ borderBottom: "1px solid #f0f0f0" }}
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
        <div className="flex relative w-full">
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: "19",
            }}
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
              </Link>
              <p className="select-none font-bold opacity-35">
                {dateFormat(new Date(created_at))}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="flex items-center mt-[1em] w-fit gap-x-[.25em] text-gray-400 font-bold">
                {extractLiveIdentifier(live_link).isValid ? (
                  <>
                    <LiveTvRoundedIcon sx={{ mb: 0.25 }} />
                    ライブ出品
                  </>
                ) : (
                  <>
                    <LabelRoundedIcon sx={{ fontSize: "1.25em" }} />
                    販売商品
                  </>
                )}
              </p>
              <p className="mt-[1em]">
                <StarRating
                  rating={
                    rating && rating !== -1 ? rating.toFixed(1) : "評価なし"
                  }
                ></StarRating>
              </p>
            </div>
            <h3 className="mt-[1em] pb-[1em] font-bold text-xl">{name}</h3>

            <PostTags tags={tags} />

            {extractLiveIdentifier(live_link).isValid &&
            images?.length === 0 ? (
              <LiveEmbedCard live_link={live_link} id={id} />
            ) : (
              <Box sx={{ position: "relative" }}>
                {images?.length > 0 && <PostImageContainer images={images} />}
                <Box
                  sx={{
                    backgroundColor: price ? "primary.main" : "#999",
                    color: "white",
                    width: "fit-content",
                    padding: ".5em 1.5em",
                    fontWeight: "bold",
                    borderRadius: ".75em 0 0 .75em",
                    position: "absolute",
                    bottom: "10%",
                    right: 0,
                    zIndex: 10,
                    letterSpacing: ".075em",
                    pointerEvents: "none",
                  }}
                >
                  {formatPrice(price)}
                </Box>
              </Box>
            )}

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
              setLikeCount={setLikeCount}
              is_reposted={isReposted}
              setReposted={setisReposted}
              is_liked={isLiked}
              setLiked={setisLiked}
              quote_count={quote_count}
              setPosts={setPosts}
              setRefresh={setRefresh}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Product;
