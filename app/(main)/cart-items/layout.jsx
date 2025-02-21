import { headers } from "next/headers";

const CartItemLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `カート | Miseba`,
    metadataBase:
      process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${headers().get("host")}`,
    description: "ユーザーのカートページ",
  };
}

export default CartItemLayout;
