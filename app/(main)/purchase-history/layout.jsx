import { headers } from "next/headers";

const PurchaseHistoryLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `購入履歴 | Miseba`,
    metadataBase:
      process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${headers().get("host")}`,
    description: "購入履歴ページ",
  };
}

export default PurchaseHistoryLayout;
