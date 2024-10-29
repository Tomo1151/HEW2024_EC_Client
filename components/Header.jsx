"use client";

import Image from "next/image";

import {
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
  LoginRounded,
  LogoutRounded,
  CreateRounded,
} from "@mui/icons-material";

import Link from "next/link";

import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const { logout } = useAuthContext();

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
      href: "/",
      type: "link",
      icon: <AccountCircleRounded sx={navigationIconStyle} />,
    },
    {
      name: "タイムライン",
      href: "/",
      type: "link",
      icon: <HomeRounded sx={navigationIconStyle} />,
    },
    {
      name: "ライブ配信",
      href: "/",
      type: "link",
      icon: <LiveTvRounded sx={navigationIconStyle} />,
    },
    {
      name: "通知",
      href: "/",
      type: "link",
      icon: <NotificationsRounded sx={navigationIconStyle} />,
    },
    {
      name: "カート",
      href: "/",
      type: "link",
      icon: <ShoppingCartRounded sx={navigationIconStyle} />,
    },
    {
      name: "購入履歴",
      href: "/",
      type: "link",
      icon: <CheckBoxRounded sx={navigationIconStyle} />,
    },
    {
      name: "新規登録",
      href: "/register",
      type: "auth",
      icon: <CreateRounded sx={navigationIconStyle} />,
    },
    {
      name: "ログイン",
      href: "/login",
      type: "auth",
      icon: <LoginRounded sx={navigationIconStyle} />,
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
      <Drawer
        component="header"
        variant="permanent"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidthStyle,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: drawerWidthStyle,
            boxSizing: "border-box",
            zIndex: 39,
          },
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
                href={item.type === "link" ? item.href : null}
                onClick={item.type === "func" ? item.onclick : null}
                sx={{ position: "relative" }}
              >
                {item.type === "auth" && (
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
      </Drawer>
    </>
  );
};

export default Header;
