import { headers } from "next/headers";

const ProductRatingLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `購入商品の評価 | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "購入済み商品の評価ページ",
  };
}

export default ProductRatingLayout;
