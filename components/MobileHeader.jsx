import React from "react";
import { Box } from "@mui/material";

const MobileHeader = ({ isHeaderTransparent }) => {
  return (
    <Box
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
        justifyContent: "center",
        alignItems: "center",
        borderRight: "1px solid #f0f0f0",
        p: "0",
        minWidth: "fit-content",
        zIndex: 48,
        transition: "opacity 0.25s",
        opacity: { xs: isHeaderTransparent ? 0.5 : 1, sm: 1 },
      }}
    >
      <p className="text-white text-lg font-bold">ここがヘッダー</p>
    </Box>
  );
};

export default MobileHeader;
