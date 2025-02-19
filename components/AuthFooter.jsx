"use client";

import { useUserContext } from "@/context/UserContext";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";

const AuthFooter = () => {
  const { activeUser } = useUserContext();
  if (activeUser || activeUser === null) {
    return null;
  }
  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        display: "flex",
        position: "fixed",
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
        gap: "1em",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "6em",
        zIndex: 40,
      }}
      className="px-[15%]"
    >
      <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
        <h2 className="flex justify-center items-center text-center text-xl font-bold grow w-full">
          つくる。売る。つながる。&nbsp; あなたの作品を共有しよう。
        </h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: "fit-content",
        }}
      >
        <Link href="/register" scroll={false}>
          <Button
            variant="standard"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
            }}
          >
            新規登録
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: "fit-content",
        }}
      >
        <Link href="/login" scroll={false}>
          <Button
            variant="standard"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
            }}
          >
            ログイン
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default AuthFooter;
