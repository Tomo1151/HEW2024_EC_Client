"use client";

import Image from "next/image";
import Link from "next/link";

import { Box, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";

import PostTags from "./PostTags";
import QuoteCard from "./QuoteCard";

import { urlForImage } from "@/utils/utils";
import { formatPrice } from "@/utils/formatPrice";
import { formatPostBody } from "@/utils/postBodyFormat";

const ProductPreview = ({
  username,
  nickname,
  icon_link,
  name,
  tags,
  price,
  images,
  quoted_ref,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        fontSize: { xs: "11.5px", sm: "1em" },
      }}
    >
      <div
        className={`relative bg-white mb-[2px] px-2 sm:px-8 py-[1em]`}
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <div className="flex relative">
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: "19",
              fontSize: "1.9em",
            }}
          >
            <MoreHorizRounded
              sx={
                {
                  // fontSize: "10px",
                }
              }
            />
          </IconButton>

          <div className="shrink-0">
            <div className="relative h-fit hover:brightness-[.75] rounded-full duration-200 z-10 select-none cursor-pointer">
              <Box sx={{ width: "3.125em", height: "3.125em", mr: "1em" }}>
                <Image
                  src={urlForImage(icon_link)}
                  width="50"
                  height="50"
                  className="rounded-full object-cover w-full h-full"
                  alt="ユーザーアイコン"
                />
              </Box>
            </div>
          </div>
          <div className="px-[.5em] grow" style={{ fontSize: "1em" }}>
            <div>
              <p className="inline relative font-bold hover:underline tracking-[.075em] z-10 select-none cursor-pointer">
                {nickname || username}
              </p>
              <p className="select-none font-bold opacity-35">{"たった今"}</p>
            </div>

            <p
              className="flex text-[1em] items-center mt-[1em] w-fit gap-x-[.25em] text-gray-400 font-bold"
              // style={{ transform: "scale(0.75)", transformOrigin: "top left" }}
            >
              <LabelRoundedIcon />
              <span>販売商品</span>
            </p>
            <h3
              className="mt-[1em] pb-[1em] font-bold text-xl"
              style={{ fontSize: "1.25em !important" }}
            >
              {name}
            </h3>
            <PostTags tags={tags} />
            <Box sx={{ position: "relative" }}>
              {images?.length > 0 && (
                <PostImageContainer images={images} is_preview />
              )}
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  width: "fit-content",
                  padding: ".5em 1.5em",
                  fontWeight: "bold",
                  borderRadius: ".5em 0 0 .5em",
                  position: "absolute",
                  bottom: "10%",
                  right: 0,
                  zIndex: 10,
                  letterSpacing: ".05em",
                  pointerEvents: "none",
                }}
              >
                {formatPrice(price)}
              </Box>
            </Box>

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
              comment_count={0}
              ref_count={0}
              like_count={0}
              quote_count={0}
              is_reposted={false}
              is_liked={false}
              is_preview
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProductPreview;
