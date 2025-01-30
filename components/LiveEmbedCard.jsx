import { useRef, memo } from "react";
import { Box } from "@mui/material";
import { YouTubeEmbed } from "@next/third-parties/google";
import { TwitchEmbed } from "react-twitch-embed";
import { extractLiveIdentifier } from "@/utils/utils";

const LiveEmbedCard = memo(({ live_link, id }) => {
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.

  const handleReady = (e) => {
    embed.current = e;
  };

  const liveData = extractLiveIdentifier(live_link);

  return (
    <>
      {liveData.type === "youtube" && (
        <YouTubeEmbed
          videoid={liveData.id}
          style="border-radius: 0.75rem;z-index: 2;"
          // style={{ borderRadius: "0.75rem", zIndex: 2 }}
        />
      )}
      {liveData.type === "twitch" && (
        <TwitchEmbed
          id={`twitch-embed-${liveData.id}-${id}`}
          channel={liveData.id}
          autoplay={false}
          withChat={false}
          muted
          darkMode={false}
          onVideoReady={handleReady}
          width="100%"
          height="100%"
          style={{
            position: "relative",
            borderRadius: "0.75rem",
            zIndex: 2,
            aspectRatio: "16 / 9",
          }}
        />
      )}
    </>
    // <YouTubeEmbed
    //   videoid="bKHGCr-83DQ"
    //   style="border-radius: 0.75rem;z-index: 2;"
    // />

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
});

export default LiveEmbedCard;
