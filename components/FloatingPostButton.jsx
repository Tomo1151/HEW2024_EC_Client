"use client";

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { EditNoteRounded, ColorLensRounded } from "@mui/icons-material";

const FloatingPostButton = () => {
  const actions = [
    {
      icon: <EditNoteRounded />,
      name: "投稿",
      onclick: () => console.log("post"),
    },
    {
      icon: <ColorLensRounded />,
      name: "作品投稿",
      onclick: () => console.log("post product"),
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
