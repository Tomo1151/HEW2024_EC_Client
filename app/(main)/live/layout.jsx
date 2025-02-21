import { headers } from "next/headers";

const LiveTimelineLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `ライブ配信 | Miseba`,
    metadataBase:
      process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${headers().get("host")}`,
    description: "ライブ配信のタイムライン",
  };
}

export default LiveTimelineLayout;
