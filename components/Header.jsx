"use client";

import Image from "next/image";

import {
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
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

import { useUserContext } from "@/context/UserContext";
import theme from "@/theme/theme";

const Header = () => {
  const { activeUser, logout, cartItem } = useUserContext();

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
      href: "/",
      type: "link",
      icon: <NotificationsRounded sx={navigationIconStyle} />,
      loginRequired: true,
    },
    {
      name: "カート",
      href: "/",
      type: "link",
      icon: (
        <Badge badgeContent={cartItem.length} color="error">
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
  ];

  return (
    <>
      <Box
        component="header"
        sx={{
          // width: drawerWidthStyle,
          height: "100vh",
          flexShrink: 0,
          whiteSpace: "nowrap",
          position: "sticky",
          top: 0,
          justifyContent: "flex-end",
          borderRight: "1px solid #f0f0f0",
          p: isIconView ? "0" : "0 2em 0",
          minWidth: "fit-content",
        }}
      >
        <List
          sx={{
            width: "fit-content",
            "& .MuiListItemText-primary": {
              fontSize: "1.25em",
            },
            "& .MuiListItemIcon-root": {
              justifyContent: "center",
              mx: "auto",
              minWidth: "50px",
            },
          }}
        >
          <ListItem
            sx={{
              backgroundColor: "primary.main",
              pt: "1em",
              mb: "1em",
              justifyContent: isIconView ? "center" : "flex-start",
              textAlign: "center",
              minHeight: "80px",
              width: "100%",
              borderRadius: ".375rem",
            }}
          >
            <Link href="/" scroll={false}>
              <Image
                src={isIconView ? "/appri_logo_s.svg" : "/appri_logo.svg"}
                width={1516}
                height={673}
                alt="アプリロゴ"
                priority={true}
                className={`w-full ${isIconView ? "max-w-[50px]" : "max-w-[150px] pl-4"} object-contain`}
              />
            </Link>
          </ListItem>
          {listItems.map((item, index) => (
            <ListItem key={index} className={isIconView ? `w-fit` : "w-full"}>
              <ListItemButton
                href={
                  item.loginRequired && activeUser === false ? null : item.href
                }
                onClick={item.type === "func" ? item.onclick : null}
                sx={{
                  position: "relative",
                  justifyContent: "center",
                  minWidth: "fit-content",
                  width: isIconView ? "fit-content" : "100%",
                  // pr: isIconView ? "0" : "2em",
                }}
              >
                {item.loginRequired && activeUser === false && (
                  <Link
                    href="/login"
                    className="absolute inset-0 w-full h-full"
                    scroll={false}
                  ></Link>
                )}
                <ListItemIcon sx={{ width: "fit-content" }} className="mx-0">
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    flexBasis: "80%",
                    pr: isIconView ? "0" : "1em",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
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
