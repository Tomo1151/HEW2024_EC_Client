import React from "react";
import { Box } from "@mui/material";

const MobileHeader = () => {
  return (
    <Box
      component="header"
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
        width: "100%",
        height: "var(--height-header)",
        flexShrink: 0,
        backgroundColor: "primary.main",
        whiteSpace: "nowrap",
        position: "fixed",
        top: 0,
        justifyContent: "flex-end",
        borderRight: "1px solid #f0f0f0",
        p: "0",
        minWidth: "fit-content",
        zIndex: 1000,
      }}
    ></Box>
  );
};

export default MobileHeader;
