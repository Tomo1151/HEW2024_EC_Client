"use client";

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import Image from "next/image";

export default function Error(error) {
  return (
    <Box
      sx={{
        width: "100%",
        mt: {
          xs: "calc(var(--height-header)*-1)",
          sm: "0",
        },
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Box
          sx={{
            display: "flex",
            px: {
              xs: 2,
              sm: 4,
            },
            pt: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" className="h-[75px]">
            <Image
              src="/miseba_logo_image_invert.svg"
              alt="logo"
              width={700}
              height={573}
              className="w-full h-full"
              priority
            />
          </Link>
        </Box>
      </Box>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>問題が発生しました。一度トップに戻ってください</p>
        <Button
          variant="contained"
          sx={{
            display: "block",
            width: "fit-content",
            mx: "auto",
            my: "2em",
          }}
          href="/"
        >
          トップに戻る
        </Button>
      </div>
    </Box>
  );
}
