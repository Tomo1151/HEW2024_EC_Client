"use client";
import { useEffect, useState } from "react";

import { Box, ThemeProvider } from "@mui/material";

import MainColumnHeader from "@/components/MainColumnHeader";
import theme from "@/theme/theme";

const liveHelp = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">ヘルプ</h3>
      </MainColumnHeader>
      <Box className="m-[2rem]"></Box>
    </ThemeProvider>
  );
};

export default liveHelp;
