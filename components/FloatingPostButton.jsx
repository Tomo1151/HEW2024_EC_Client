"use client";

import { useRouter } from "next/navigation";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { EditNoteRounded, ColorLensRounded } from "@mui/icons-material";

const FloatingPostButton = () => {
  const router = useRouter();

  const actions = [
    {
      icon: <EditNoteRounded />,
      name: "投稿",
      onclick: () => router.push("/post?type=post"),
    },
    {
      icon: <ColorLensRounded />,
      name: "作品投稿",
      onclick: () => router.push("/post?type=product"),
    },
  ];

  return (
    <SpeedDial
      ariaLabel="投稿ボタン"
      sx={{ position: "fixed", bottom: "5em", right: "7em", zIndex: 10 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onclick}
        />
      ))}
    </SpeedDial>
  );
};

export default FloatingPostButton;
