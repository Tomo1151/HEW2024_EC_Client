import { useRef } from "react";
import { Box } from "@mui/material";
import { YouTubeEmbed } from "@next/third-parties/google";
import { TwitchEmbed } from "react-twitch-embed";

const LiveEmbedCard = ({ live_link }) => {
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.

  const handleReady = (e) => {
    embed.current = e;
  };

  return (
    <YouTubeEmbed
      videoid="zR_38qWwN7E"
      style="border-radius: 0.75rem;z-index: 2;"
    />

    // <TwitchEmbed
    //   channel="ow_esports_jp"
    //   autoplay={false}
    //   withChat={false}
    //   muted
    //   darkMode={false}
    //   onVideoReady={handleReady}
    //   width="100%"
    //   height="100%"
    //   style={{
    //     position: "relative",
    //     borderRadius: "0.75rem",
    //     zIndex: 2,
    //     aspectRatio: "16 / 9",
    //   }}
    // />
  );
};

export default LiveEmbedCard;
