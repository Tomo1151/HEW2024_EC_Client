"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";

import { fetchHeaders } from "@/config/fetchConfig";
import { useUserContext } from "../context/UserContext";
import { useNotifications } from "@toolpad/core/useNotifications";
import PostTags from "./PostTags";
import QuoteCard from "./QuoteCard";
import { urlForImage } from "@/utils/utils";
import { dateFormat } from "@/utils/dateFormat";
import { formatPrice } from "@/utils/formatPrice";
import { formatPostBody } from "@/utils/postBodyFormat";
import LiveEmbedCard from "./LiveEmbedCard";
import { extractLiveIdentifier } from "@/utils/utils";
import StarRating from "./StarRating";

const ProductDetail = ({
  type,
  repost_user,
  postId,
  username,
  nickname,
  icon_link,
  productId,
  name,
  content,
  rating,
  price,
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
  setPosts,
  setRefresh,
}) => {
  const { activeUser, fetchUserCart } = useUserContext();
  const [isReposted, setisReposted] = useState(is_reposted);
  const [isLiked, setisLiked] = useState(is_liked);
  const [repostCount, setRepostCount] = useState(ref_count);
  const [likeCount, setLikeCount] = useState(like_count);
  const notifications = useNotifications();
  const [isCarted, setisCarted] = useState(false);

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

  const addToCart = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FETCH_BASE_URL + `/carts/items`,
        {
          method: "POST",
          headers: fetchHeaders,
          body: JSON.stringify({
            productId,
          }),
          credentials: "include",
        }
      );
      const resJson = await response.json();

      if (resJson.success) {
        setisCarted(true);
        fetchUserCart();
        notifications.show("商品をカートに追加しました", {
          severity: "success",
          autoHideDuration: 3000,
        });
      } else {
        notifications.show("商品のカート追加に失敗しました", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        console.log(setPosts);
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
    <Box id={postId} component="section">
      <div
        className="relative bg-white mb-[2px] px-4 sm:px-8 pt-8 pb-4"
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        {type === "repost" && (
          <p className="font-bold pb-4 text-gray-300">
            {repost_user.nickname || repost_user.username}がリポストしました
          </p>
        )}
        <div className="relative">
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
          <div className="flex shrink-0">
            <Link
              href={`/users/${username}`}
              scroll={false}
              className="relative h-fit hover:brightness-[.75] rounded-full duration-200 z-10"
            >
              <Box
                sx={{
                  width: { xs: "2.75em", sm: "50px" },
                  height: { xs: "2.75em", sm: "50px" },
                  mr: { xs: 1, sm: 2 },
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
            <div>
              <Link
                href={`/users/${username}`}
                className="relative font-bold hover:underline tracking-[.075em] z-10"
                scroll={false}
              >
                {nickname || username}
              </Link>
              <p className="select-none font-bold opacity-35">
                {dateFormat(new Date(created_at))}
              </p>
            </div>
          </div>
          <div className="px-2 grow">
            <h3 className="mt-4 pb-4 font-bold text-xl">{name}</h3>

            <PostTags tags={tags} />

            {extractLiveIdentifier(live_link).isValid &&
            images?.length === 0 ? (
              <LiveEmbedCard live_link={live_link} />
            ) : (
              <Box sx={{ position: "relative" }}>
                {images?.length > 0 && <PostImageContainer images={images} />}
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
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="text-2xl text-left font-bold pl-8 py-4">
          <StarRating
            rating={rating && rating !== -1 ? rating.toFixed(1) : "評価なし"}
          />
        </p>
        <p className="text-2xl text-right font-bold pr-8 py-4">
          {formatPrice(price)}
        </p>
      </Box>
      <Box sx={{ textAlign: "center", px: "2.5rem" }}>
        {activeUser ? (
          activeUser.username !== username && (
            <Button
              variant="contained"
              sx={{ px: 8 }}
              onClick={addToCart}
              disabled={isCarted || isNaN(parseInt(price))}
            >
              {isNaN(parseInt(price)) ? "購入できません" : "カートに追加"}
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            sx={{ px: 8 }}
            onClick={() => router.push("/login")}
          >
            カートに追加
          </Button>
        )}

        <p className="text-left py-4 ">{formatPostBody(content)}</p>
      </Box>
    </Box>
  );
};

export default ProductDetail;
