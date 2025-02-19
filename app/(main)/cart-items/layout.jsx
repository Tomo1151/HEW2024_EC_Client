import { headers } from "next/headers";

const CartItemLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `カート | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "ユーザーのカートページ",
  };
}

export default CartItemLayout;
