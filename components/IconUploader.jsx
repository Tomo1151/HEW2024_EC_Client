"use client";
import { useState } from "react";
import Image from "next/image";

import { Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const IconUploader = ({ width = 52, height = 52, src_img }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState(src_img || null);
  const image_link = "https://placeholder.com/150";

  return (
    <Box sx={{ position: "relative", width, height }}>
      <Image
        src={image || image_link}
        width={100}
        height={100}
        className="rounded-full object-cover w-full h-full"
        alt="ユーザーアイコン"
      />
      <AddRoundedIcon
        sx={{
          position: "absolute",
          color: "#555",
          top: "50%",
          left: "50%",
          width: "75%",
          height: "75%",
          opacity: isHovered ? 0.75 : 0,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s",
        }}
      />
      <input
        type="file"
        className="icon-uploader absolute inset-0 w-full h-full rounded-full opacity-50 cursor-pointer hover:backdrop-brightness-75 hover:opacity-100 duration-200"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setImage(e.target.result);
            };
            reader.readAsDataURL(file);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Box>
  );
};

export default IconUploader;
