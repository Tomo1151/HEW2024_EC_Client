import { headers } from "next/headers";

const DashboardPageLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `ダッシュボード | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "ユーザーの投稿に関する情報の詳細ページ",
  };
}

export default DashboardPageLayout;
