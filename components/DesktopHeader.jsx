import React from "react";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const DesktopHeader = ({ listItems, activeUser, isHeaderTransparent }) => {
  return (
    <Container
      component="header"
      sx={{
        display: {
          xs: "none",
          sm: "flex",
        },
        height: "100vh",
        width: "fit-content",
        maxWidth: { sm: "13em", lg: "32dvw" },
        mx: 0,
        flexShrink: 0,
        flexGrow: 1,
        whiteSpace: "nowrap",
        position: "sticky",
        top: 0,
        justifyContent: "flex-end",
        borderRight: "1px solid #f0f0f0",
        p: { sm: "0", lg: "0 2em 0" },
        minWidth: "fit-content",
        transition: "opacity 0.25s",
        opacity: { xs: isHeaderTransparent ? 0.5 : 1, sm: 1 },
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
            // backgroundColor: "primary.main",
            pt: "1em",
            px: { sm: 4.25, lg: 1.75 },
            mt: "1em",
            justifyContent: { sm: "center", lg: "flex-start" },
            textAlign: "center",
            minHeight: "80px",
            width: "100%",
            borderRadius: ".375rem",
          }}
        >
          {/* 名前つき */}
          <Link href="/" className="hidden lg:inline">
            <Image
              src="/miseba_logo_image.svg"
              width={1516}
              height={673}
              alt="アプリロゴ"
              priority
              className="max-w-[200px] pl-4 object-contain hover:drop-shadow-[0_3px_10px_rgba(109,201,101,0.5)] duration-200"
            />
          </Link>
          <Link href="/" className="lg:hidden">
            <Image
              src="/miseba_logo_icon.svg"
              width={700}
              height={573}
              alt="アプリロゴ"
              priority
              className="w-full max-w-[50px] object-contain hover:drop-shadow-[0_3px_10px_rgba(109,201,101,0.5)] duration-200"
            />
          </Link>
        </ListItem>
        {listItems.map((item, index) => {
          if (item.name === "ログアウト" && activeUser === false) {
            return null;
          }
          return (
            <ListItem key={index} className="w-fit lg:w-full">
              <ListItemButton
                onClick={item.type === "func" ? item.onclick : null}
                sx={{
                  position: "relative",
                  justifyContent: "center",
                  minWidth: "fit-content",
                  width: { sm: "fit-content", md: "100%" },
                  borderRadius: ".365rem",
                  ...(item.href === "/post?type=post" && {
                    backgroundColor: "primary.main",
                    color: "white",
                    transition: "opacity 0.2s",
                    mt: "2em",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      opacity: 0.8,
                    },
                  }),
                }}
              >
                {item.loginRequired && activeUser === false ? (
                  <Link
                    href="/login"
                    className="absolute inset-0 w-full h-full"
                    scroll={false}
                  ></Link>
                ) : (
                  <Link
                    href={item.href}
                    className="absolute inset-0 w-full h-full"
                  ></Link>
                )}
                <ListItemIcon sx={{ width: "fit-content" }} className="mx-0">
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    flexBasis: "80%",
                    pr: { sm: "0", md: "1em" },
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
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
    </Container>
  );
};

export default DesktopHeader;
