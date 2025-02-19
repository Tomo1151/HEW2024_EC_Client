import { headers } from "next/headers";

const ProductDownloadPage = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `購入データのダウンロード | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "購入済み商品データのダウンロードページ",
    keywords: "ダウンロード, 購入, ユーザー",
  };
}

export default ProductDownloadPage;
