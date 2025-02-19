import { headers } from "next/headers";

const ContactLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `お問い合わせ | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "お問い合わせページ",
  };
}

export default ContactLayout;
