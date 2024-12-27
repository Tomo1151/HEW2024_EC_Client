"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ArrowBackButton from "@/components/ArrowBackButton";

const HEADER_SCROLL_THRESHOLD = 360;
const MainColumnHeader = ({ children }) => {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false);

  const handleScroll = () => {
    // console.log(window.scrollY);
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
      setIsHeaderTransparent(true);
    } else {
      setIsHeaderTransparent(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        color: "#333",
        position: "sticky",
        top: {
          xs: "var(--height-header)",
          sm: 0,
        },
        backgroundColor: "white",
        borderBottom: "2px solid #f0f0f0",
        px: { xs: 1, sm: 2 },
        py: 1,
        transition: "opacity 0.25s",
        opacity: { xs: isHeaderTransparent ? 0.5 : 1, sm: 1 },
        zIndex: 39,
      }}
    >
      <Box sx={{ mr: { xs: 1, sm: 2 } }}>
        <ArrowBackButton />
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainColumnHeader;
