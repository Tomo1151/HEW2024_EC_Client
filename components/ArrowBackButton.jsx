"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const ArrowBackButton = () => {
  const router = useRouter();
  return (
    <IconButton onClick={router.back}>
      <ArrowBackRoundedIcon />
    </IconButton>
  );
};

export default ArrowBackButton;
