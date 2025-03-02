import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Box, SwipeableDrawer, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchBar from "./SearchBar";
import { urlForImage } from "@/utils/utils";

const MobileHeader = ({ listItems, activeUser, isHeaderTransparent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (state) => {
    setIsMenuOpen(state);
  };

  return (
    <>
      <div></div>
      <Box
        id="mobile_header"
        component="header"
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          width: "100%",
          height: "var(--height-header)",
          flexShrink: 0,
          backgroundColor: "primary.main",
          whiteSpace: "nowrap",
          position: "fixed",
          top: 0,
          justifyContent: "space-between",
          alignItems: "center",
          borderRight: "1px solid #f0f0f0",
          p: "0",
          minWidth: "fit-content",
          zIndex: 48,
          transition: "opacity 0.25s",
          opacity: { xs: isHeaderTransparent ? 0.5 : 1, sm: 1 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            width: "100%",
            pl: 4,
            pr: 1,
            opacity: isSearchOpen ? 1 : 0,
            zIndex: isSearchOpen ? 1 : -1,
            transition: "opacity 0.2s",
          }}
        >
          <SearchBar />
          <IconButton
            sx={{ width: "fit-content" }}
            onClick={() => setIsSearchOpen(false)}
          >
            <CloseRoundedIcon sx={{ color: "white", m: 1 }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            opacity: isSearchOpen ? 0 : 1,
            zIndex: isSearchOpen ? -1 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <Box sx={{ width: "fit-content" }}>
            <IconButton
              sx={{ width: "fit-content" }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuRoundedIcon
                sx={{ color: "white", fontSize: "1.5em", m: 1 }}
              />
            </IconButton>
          </Box>
          <Box sx={{ width: "fit-content" }}>
            <IconButton sx={{ width: "fit-content" }}>
              <SearchRoundedIcon
                onClick={() => setIsSearchOpen(true)}
                sx={{ color: "white", fontSize: "1.5em", mx: 1, mt: 0.5 }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <Link href="/" scroll={true}>
              <Image
                src="/miseba_logo_image_invert.svg"
                width={700}
                height={573}
                alt="アプリロゴ"
                style={{
                  width: "125px",
                  height: "auto",
                }}
                priority
              />
            </Link>
          </Box>
        </Box>
      </Box>

      <SwipeableDrawer
        open={isMenuOpen}
        onClose={() => toggleDrawer(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // onClick={toggleDrawer(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              pt: 2,
            }}
          >
            <IconButton
              sx={{ width: "fit-content" }}
              onClick={() => toggleDrawer(false)}
            >
              <CloseRoundedIcon sx={{ fontSize: "1.5em", m: 1 }} />
            </IconButton>
            <Image
              src={urlForImage(activeUser?.icon_link)}
              width={50}
              height={50}
              alt="ユーザーアイコン"
              className="w-[40px] h-[40px] rounded-full object-cover"
              style={{
                width: "40px",
                height: "auto",
                margin: "auto 0",
                // filter:"brightness(0) saturate(100%) invert(70%) sepia(10%) saturate(2007%) hue-rotate(68deg) brightness(100%) contrast(87%)",
              }}
              priority
            />
          </Box>
          <List
            component="nav"
            sx={{
              width: "100%",
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
            {listItems.map((item, index) => {
              if (item.name === "ログアウト" && activeUser === false) {
                return null;
              }
              return (
                <ListItem key={index} className={"w-full"}>
                  <ListItemButton
                    href={
                      item.loginRequired && activeUser === false
                        ? null
                        : item.href
                    }
                    onClick={item.type === "func" ? item.onclick : null}
                    sx={{
                      position: "relative",
                      justifyContent: "center",
                      minWidth: "fit-content",
                      width: "100%",
                      borderRadius: ".365rem",
                      ...(item.href === "/post?type=post" && {
                        backgroundColor: "primary.main",
                        color: "white",
                        transition: "opacity 0.2s",
                        mt: "2em",
                        mx: "1em",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                          opacity: 0.8,
                        },
                      }),
                    }}
                  >
                    {item.loginRequired && activeUser === false && (
                      <Link
                        href="/login"
                        className="absolute inset-0 w-full h-full"
                        scroll={false}
                      ></Link>
                    )}
                    <ListItemIcon
                      sx={{ width: "fit-content" }}
                      className="mx-0"
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{
                        flexBasis: "80%",
                        pr: "1em",
                        ...(item.href === "/post?type=post" && {
                          textAlign: "center",
                        }),
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "column",
              flexWrap: "wrap",
              // alignItems: "center",
              mt: "auto",
              columnGap: 1,
              rowGap: 0.25,
              color: "#888",
              px: 4,
              py: 2,
            }}
          >
            <Link href="/terms" className="w-fit">
              利用規約
            </Link>
            <Link href="/credits" className="w-fit">
              クレジット
            </Link>
            <Link href="/contact" className="w-fit">
              お問い合わせ
            </Link>
            <Link href="/patch" className="w-fit">
              パッチノート
            </Link>
            <Link href="/help" className="w-fit">
              ヘルプ
            </Link>
            <p className="leading-[1em] pt-2">
              <small className="">
                これはコンセプトサービスです。
                <br />
                実際に金銭のやり取りは 発生しません。
              </small>
            </p>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHeader;
