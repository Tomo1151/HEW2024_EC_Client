import { headers } from "next/headers";

const ProductRatingLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `購入商品の評価 | Miseba`,
    metadataBase:
      process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${headers().get("host")}`,
    description: "購入済み商品の評価ページ",
  };
}

export default ProductRatingLayout;
