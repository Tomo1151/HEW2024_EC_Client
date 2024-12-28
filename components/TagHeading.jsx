"use client";

import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";

const TagHeading = ({ tagName }) => {
  const isIncluedPinnedTag = (tagName) => {
    if (typeof window === "undefined") return false;
    const pinnedTag = JSON.parse(localStorage.getItem("pinnedTag"));
    return pinnedTag ? pinnedTag.includes(tagName) : false;
  };

  const [isPinned, setIsPinned] = useState(false);

  const handlePin = () => {
    try {
      if (typeof window === "undefined") return;
      const pinnedTag = JSON.parse(localStorage.getItem("pinnedTag"));
      let newTags = [];
      console.log("pinnedTag", pinnedTag);
      console.log(pinnedTag ? pinnedTag.concat(tagName) : [tagName]);
      console.log(pinnedTag ? pinnedTag.filter((tag) => tag !== tagName) : []);
      if (!isPinned) {
        newTags = [
          ...new Set(pinnedTag ? pinnedTag.concat([tagName]) : [tagName]),
        ];
        setIsPinned(true);
      } else {
        newTags = [
          ...new Set(
            pinnedTag ? pinnedTag.filter((tag) => tag !== tagName) : []
          ),
        ];
        setIsPinned(false);
      }
      localStorage.setItem("pinnedTag", JSON.stringify(newTags));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsPinned(isIncluedPinnedTag(tagName));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "1.5em",
        fontWeight: "bold",
        mb: 2,
        px: 4,
        pt: 2,
        pb: 2,
        borderBottom: "1px solid #f0f0f0",
        justifyContent: "space-between",
      }}
    >
      <h2>#{tagName}</h2>
      <Tooltip title="ホームにピン留め">
        <IconButton
          color={isPinned ? "primary" : ""}
          sx={{ rotate: "45deg" }}
          onClick={handlePin}
        >
          <PushPinRoundedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TagHeading;
