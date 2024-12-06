"use client";

import Image from "next/image";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  HomeRounded,
  AccountCircleRounded,
  LiveTvRounded,
  NotificationsRounded,
  ShoppingCartRounded,
  CheckBoxRounded,
  LogoutRounded,
} from "@mui/icons-material";

import Link from "next/link";

import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const { activeUser, logout } = useAuthContext();

  const drawerWidth = 420;
  const drawerWidthStyle = {
    xs: drawerWidth / 3,
    sm: drawerWidth / 3,
    md: drawerWidth / 1.5,
    xl: drawerWidth,
  };

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
      href: "/",
      type: "link",
      icon: <NotificationsRounded sx={navigationIconStyle} />,
      loginRequired: true,
    },
    {
      name: "カート",
      href: "/",
      type: "link",
      icon: <ShoppingCartRounded sx={navigationIconStyle} />,
      loginRequired: true,
    },
    {
      name: "購入履歴",
      href: "/",
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
  ];

  return (
    <>
      <Box
        component="header"
        sx={{
          width: drawerWidthStyle,
          height: "100vh",
          flexShrink: 0,
          whiteSpace: "nowrap",
          position: "sticky",
          top: 0,
          justifyContent: "flex-end",
          borderRight: "1px solid #f0f0f0",
          marginLeft: "2em",
          minWidth: "fit-content",
        }}
      >
        <List
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "1.25em",
            },
            "& .MuiListItemIcon-root": {
              justifyContent: "center",
              mx: {
                xs: "auto",
                sm: "auto",
                md: "auto",
                xl: "2em",
              },
              minWidth: "50px",
            },
          }}
        >
          <ListItem
            sx={{
              backgroundColor: "primary.main",
              pt: "1em",
              pl: {
                xl: "3.5em",
              },
              mb: "1em",
              minHeight: "80px",
            }}
          >
            <Link href="/" scroll={false}>
              <Image
                src="/appri_logo.png"
                width={1516}
                height={673}
                alt="アプリロゴ"
                priority={true}
                className="w-[150px] object-contain"
              />
            </Link>
          </ListItem>
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                href={
                  item.loginRequired && activeUser === false ? null : item.href
                }
                onClick={item.type === "func" ? item.onclick : null}
                sx={{ position: "relative" }}
              >
                {item.loginRequired && activeUser === false && (
                  <Link
                    href="/login"
                    className="absolute inset-0 w-full h-full"
                    scroll={false}
                  ></Link>
                )}
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Header;
