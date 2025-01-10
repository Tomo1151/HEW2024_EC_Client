import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Box, SwipeableDrawer, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const MobileHeader = ({ listItems, activeUser, isHeaderTransparent }) => {
  const [open, setOpen] = useState(false);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
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
          justifyContent: "flex-start",
          alignItems: "center",
          borderRight: "1px solid #f0f0f0",
          p: "0",
          minWidth: "fit-content",
          zIndex: 48,
          transition: "opacity 0.25s",
          opacity: { xs: isHeaderTransparent ? 0.5 : 1, sm: 1 },
        }}
      >
        <Box sx={{ width: "fit-content" }}>
          <IconButton
            sx={{ width: "fit-content" }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuRoundedIcon
              sx={{ color: "white", fontSize: "1.5em", ml: 1 }}
            />
          </IconButton>
        </Box>
        {/* <Box sx={{}}>
          <IconButton sx={{ width: "fit-content" }}>
            <MenuRoundedIcon />
          </IconButton>
        </Box> */}
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
              src="/appri_logo_s.svg"
              width={700}
              height={573}
              alt="アプリロゴ"
              style={{
                width: "50px",
                height: "auto",
              }}
              priority
            />
          </Link>
        </Box>
        {/* <p className="text-white text-lg font-bold">ここがヘッダー</p> */}
      </Box>
      <SwipeableDrawer
        open={open}
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
              onClick={() => toggleDrawer(true)}
            >
              <MenuRoundedIcon sx={{ fontSize: "1.5em", ml: 1 }} />
            </IconButton>
            <Image
              src={
                activeUser?.icon_link
                  ? `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/icons/${activeUser?.icon_link}`
                  : "https://placeholder.com/150"
              }
              width={50}
              height={50}
              alt="アプリロゴ"
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
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHeader;
