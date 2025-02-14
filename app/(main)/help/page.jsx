"use client";
import Link from "next/link";
import { Box, ThemeProvider } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";

const liveHelp = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">ヘルプ</h3>
      </MainColumnHeader>
      <Box className="m-[3rem]">
        <h1 className="text-3xl">ヘルプ</h1>
        <h2 className="text-2xl mt-[2rem]">目次</h2>
        <ol className="list-disc list-outside ml-[1.5rem] mt-[2rem]">
          <li>
            <Link href={"/help/live"} className="underline">
              ライブ出品
            </Link>
          </li>
        </ol>
      </Box>
    </ThemeProvider>
  );
};

export default liveHelp;
