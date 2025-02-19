import { headers } from "next/headers";

const LiveTimelineLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `ライブ配信 | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "ライブ配信のタイムライン",
  };
}

export default LiveTimelineLayout;
