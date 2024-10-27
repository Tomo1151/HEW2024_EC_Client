"use client";

import Image from "next/image";

import {
  Box,
  Button,
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

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHouse,
//   faUser,
//   faTowerBroadcast,
//   faBell,
//   faCartShopping,
//   faSquareCheck,
// } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const drawerWidth = 420;
  const margin = 5;
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer
        component="header"
        variant="permanent"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: {
            xs: drawerWidth / 4,
            sm: drawerWidth / 3,
            md: drawerWidth / 2,
            xl: drawerWidth,
          },
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: {
              xs: drawerWidth / 3,
              sm: drawerWidth / 3,
              md: drawerWidth / 1.5,
              xl: drawerWidth,
            },
            boxSizing: "border-box",
            zIndex: 39,
          },
          minWidth: "fit-content",
        }}
        // className="fixed top-0 h-full basis-1/3 bg-main-theme z-30"
      >
        {/* <Box sx={{ backgroundColor: "primary.main" }}>
        <Image
          src="/appri_logo.png"
          width={150}
          height={150}
          alt="アプリロゴ"
          priority={true}
          className={`mx-auto px-2 pt-3 drop-shadow-md cursor-pointer`}
        />
      </Box> */}

        <List
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "1.25em", // primaryテキストのサイズ
            },
            "& .MuiListItemIcon-root": {
              justifyContent: "center", // アイコンの位置
              mx: {
                xs: "auto",
                sm: "auto",
                md: "auto",
                xl: "2em",
              }, // アイコンの左側のpadding
              minWidth: "50px", // アイコンの幅
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
            {/* <ListItemButton> */}
            <Image
              src="/appri_logo.png"
              width={150}
              height={150}
              alt="アプリロゴ"
              priority={true}
              // className={`mx-auto px-2 pt-3 drop-shadow-md cursor-pointer`}
            />
            {/* </ListItemButton> */}
          </ListItem>
          <ListItem>
            <ListItemButton href="/">
              <ListItemIcon>
                <AccountCircleRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="プロフィール"
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
          <ListItem>
            <ListItemButton href="/">
              <ListItemIcon>
                <HomeRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="タイムライン"
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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LiveTvRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="ライブ配信"
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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="通知"
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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="カート"
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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <CheckBoxRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="購入履歴"
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
          <Divider sx={{ mt: "3em" }} />
          <ListItem>
            <ListItemButton sx={{ position: "relative" }}>
              <Link
                href="/register"
                className="absolute inset-0 w-full h-full"
              ></Link>
              <ListItemIcon>
                <CreateRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="新規登録"
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

          <ListItem>
            <ListItemButton sx={{ position: "relative" }}>
              <Link
                href="/login"
                className="absolute inset-0 w-full h-full"
              ></Link>
              <ListItemIcon>
                <LoginRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="ログイン"
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
          <ListItem>
            <ListItemButton
              sx={{ position: "relative" }}
              onClick={() => {
                logout();
              }}
            >
              <ListItemIcon>
                <LogoutRounded
                  sx={{
                    fontSize: "2em",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="ログアウト"
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
        </List>
      </Drawer>
    </>
  );
};

export default Header;
