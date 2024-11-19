"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";

const AuthFooter = () => {
  const { activeUser } = useAuthContext();
  if (activeUser) {
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
      <h2 className="flex justify-center items-center text-center text-xl font-bold grow w-full">
        フッター
      </h2>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: "fit-content",
        }}
      >
        <Link href="/register">
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
        <Link href="/login">
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
