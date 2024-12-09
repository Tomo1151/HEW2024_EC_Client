"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { MoreHorizRounded } from "@mui/icons-material";
import LabelRoundedIcon from "@mui/icons-material/LabelRounded";

import PostReaction from "./PostReaction";
import PostImageContainer from "./PostImageContainer";

import { fetchHeaders } from "@/config/fetchConfig";
import { useAuthContext } from "../context/AuthContext";
import { useNotifications } from "@toolpad/core/useNotifications";

const ProductPreview = ({
  username,
  nickname,
  icon_link,
  name,
  content,
  price,
  images,
  created_at,
}) => {
  const { activeUser } = useAuthContext();
  const notifications = useNotifications();

  const router = useRouter();

  const options = {
    通報: () => {
      console.log("ポストを通報");
    },
    削除: async () => {
      console.log(`ポストを削除: ${postId}`);
      await deletePost();
    },
  };

  return (
    <section className="bg-white">
      <div
        className="relative bg-white mb-[2px] px-8 pt-8 pb-4"
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <div className="relative">
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0, zIndex: "19" }}
          >
            <MoreHorizRounded sx={{ fontSize: 30 }} />
          </IconButton>
          <div className="flex shrink-0">
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
          </div>
          <div className="px-2 grow">
            <h3 className="mt-4 pb-4 font-bold text-xl">{name}</h3>
            {images?.length > 0 && (
              <PostImageContainer images={images} is_preview />
            )}

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

      <p className="text-2xl text-right font-bold px-8 py-4">
        {isNaN(parseInt(price))
          ? "価格未設定"
          : parseInt(price).toLocaleString("ja-JP", {
              style: "currency",
              currency: "JPY",
            })}
      </p>
      <Box sx={{ textAlign: "center", px: "2.5rem" }}>
        <Button variant="contained" sx={{ px: 8 }}>
          カートに追加
        </Button>

        <p className="text-left py-4 ">{content}</p>
      </Box>
    </section>
  );
};

export default ProductPreview;
