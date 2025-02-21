import { headers } from "next/headers";

const NotificationsLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `通知 | Miseba`,
    metadataBase:
      process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${headers().get("host")}`,
    description: "ユーザーの通知ページ",
    keywords: "通知, ユーザー, 検索",
  };
}

export default NotificationsLayout;
