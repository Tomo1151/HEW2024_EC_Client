import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

const NotificationCard = ({ type, sender, is_read, rel_post }) => {
  const icons = [
    <PersonAddAltRoundedIcon sx={{ fontSize: "1.75em", color: "#555" }} />,
    <FavoriteRoundedIcon sx={{ fontSize: "1.75em", color: "red" }} />,
    <RepeatRoundedIcon sx={{ fontSize: "1.75em", color: "#2dcb2d" }} />,
    <ChatBubbleRoundedIcon sx={{ fontSize: "1.75em", color: "#68b5ff" }} />,
    <ShoppingCartRoundedIcon sx={{ fontSize: "1.75em" }} />,
    <AssignmentRoundedIcon sx={{ fontSize: "1.75em" }} />,
  ];

  const messages = [
    "さんがあなたをフォローしました",
    "さんがあなたの投稿をいいねしました",
    "さんがあなたの投稿をリポストしました",
    "さんがあなたの投稿にコメントしました",
    "さんがあなたの商品を購入しました",
    "さんがあなたの商品の購入を完了しました",
  ];

  return (
    <section
      style={{ borderBottom: "1px solid #f0f0f0" }}
      className={`relative mb-[2px] p-4 sm:p-8 hover:brightness-[.95] duration-200 ${is_read ? "bg-white" : "bg-[#6dc96525]"}`}
    >
      <Link
        href={
          rel_post
            ? rel_post.replied_ref
              ? `/posts/${rel_post.replied_ref.id}`
              : `/posts/${rel_post.id}`
            : `/users/${sender.username}`
        }
        scroll={false}
        className="absolute inset-0 w-full h-full z-[1]"
      ></Link>
      <div className="flex relative">
        <div className="shrink-0 pr-2 sm:pr-4">
          <div className="w-fit mx-auto pt-1">{icons[type]}</div>
        </div>
        <div className="grow px-2">
          <div className="">
            <Box sx={{ width: "40px", height: "40px", mr: 2 }}>
              <Link
                href={`/users/${sender.username}`}
                scroll={false}
                className="relative hover:brightness-[.75] rounded-full duration-200 z-10"
              >
                <Image
                  src={
                    sender.icon_link
                      ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${sender.icon_link}`
                      : "https://placeholder.com/150"
                  }
                  width="40"
                  height="40"
                  className="rounded-full object-cover w-full h-full"
                  alt="ユーザーアイコン"
                />
              </Link>
            </Box>
          </div>
          <div className="pt-2">
            <p>
              <Link
                href={`/users/${sender.username}`}
                scroll={false}
                className="relative hover:underline font-bold cursor-pointer z-10"
              >
                {sender.nickname || sender.username}
              </Link>
              {messages[type]}
            </p>
            {rel_post && (
              <p
                className={`text-gray-400 pt-2 ${rel_post.product && "font-bold"}`}
              >
                {rel_post.product ? rel_post.product.name : rel_post.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationCard;
