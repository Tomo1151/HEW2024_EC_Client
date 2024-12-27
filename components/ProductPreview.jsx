"use client";

import Image from "next/image";
import Link from "next/link";

import { Box, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";

import PostTags from "./PostTags";

const ProductPreview = ({
  username,
  nickname,
  icon_link,
  name,
  tags,
  price,
  images,
}) => {
  console.log(images);

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
            <Link
              href={`/users/${username}`}
              scroll={false}
              className="relative h-fit hover:brightness-[.75] rounded-full duration-200 z-10"
            >
              <Box sx={{ width: "3.125em", height: "3.125em", mr: "1em" }}>
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
          <div className="px-[.5em] grow" style={{ fontSize: "1em" }}>
            <div>
              <Link
                href={`/users/${username}`}
                className="relative font-bold hover:underline tracking-[.075em] z-10"
                scroll={false}
              >
                {nickname || username}
              </Link>
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
                {isNaN(parseInt(price))
                  ? "価格未設定"
                  : parseInt(price).toLocaleString("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    })}
              </Box>
            </Box>

            <PostReaction
              comment_count={0}
              ref_count={0}
              like_count={0}
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
