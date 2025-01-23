"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Badge, Box, useMediaQuery } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import {
  HomeRounded,
  AccountCircleRounded,
  LiveTvRounded,
  NotificationsRounded,
  ShoppingCartRounded,
  CheckBoxRounded,
  LogoutRounded,
  CreateRounded,
} from "@mui/icons-material";

import { useUserContext } from "@/context/UserContext";
import { fetchHeaders } from "@/config/fetchConfig";
import theme from "@/theme/theme";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const HEADER_SCROLL_THRESHOLD = 360;

const Header = () => {
  const pathname = usePathname();
  const { activeUser, logout, cartItems } = useUserContext();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false);

  const getUnreadNotificationCount = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FETCH_BASE_URL + "/notifications/unread",
      {
        method: "GET",
        headers: fetchHeaders,
        credentials: "include",
      }
    );

    const resJson = await response.json();

    if (resJson.success) {
      setUnreadCount(resJson.length);
    }
  };

  useEffect(() => {
    if (activeUser) {
      getUnreadNotificationCount();
    }
  }, [activeUser, pathname]);

  const isIconView = useMediaQuery(theme.breakpoints.down("lg"));

  const navigationIconStyle = { fontSize: "2em" };
  const listItems = [
    {
      name: "プロフィール",
      href: activeUser?.username ? `/users/${activeUser.username}` : "/",
      type: "link",
      icon: <AccountCircleRounded sx={navigationIconStyle} />,
      loginRequired: true,
    },
    {
      name: "タイムライン",
      href: "/",
      type: "link",
      icon: <HomeRounded sx={navigationIconStyle} />,
      loginRequired: false,
    },
    {
      name: "ライブ配信",
      href: "/",
      type: "link",
      icon: <LiveTvRounded sx={navigationIconStyle} />,
      loginRequired: false,
    },
    {
      name: "通知",
      href: "/notifications",
      type: "link",
      icon: (
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsRounded sx={navigationIconStyle} />
        </Badge>
      ),
      loginRequired: true,
    },
    {
      name: "カート",
      href: "/cart-items",
      type: "link",
      icon: (
        <Badge badgeContent={cartItems?.length} color="primary" max={99}>
          <ShoppingCartRounded sx={navigationIconStyle} />
        </Badge>
      ),
      loginRequired: true,
    },
    {
      name: "購入履歴",
      href: "/purchase-history",
      type: "link",
      icon: <CheckBoxRounded sx={navigationIconStyle} />,
      loginRequired: true,
    },
    {
      name: "ログアウト",
      href: "/",
      type: "func",
      onclick: logout,
      icon: <LogoutRounded sx={navigationIconStyle} />,
    },
    {
      name: "投稿する",
      href: "/post",
      type: "link",
      icon: <CreateRounded sx={{ ...navigationIconStyle, color: "white" }} />,
      loginRequired: true,
    },
  ];

  const handleScroll = () => {
    // console.log(window.scrollY);
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
      setIsHeaderTransparent(true);
    } else {
      setIsHeaderTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* PC用ヘッダー, sm (650px) 以上で表示 */}
      <DesktopHeader
        listItems={listItems}
        isIconView={isIconView}
        activeUser={activeUser}
        isHeaderTransparent={isHeaderTransparent}
      />
      {/* スマホ用ヘッダー, sm (650px) 未満で表示 */}
      <MobileHeader
        listItems={listItems}
        activeUser={activeUser}
        isHeaderTransparent={isHeaderTransparent}
      />
    </>
  );
};

export default Header;
