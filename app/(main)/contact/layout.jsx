import { headers } from "next/headers";

const ContactLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `お問い合わせ | Miseba`,
    metadataBase:
      process.env.NEXT_PUBLIC_SITE_ORIGIN || `https://${headers().get("host")}`,
    description: "お問い合わせページ",
  };
}

export default ContactLayout;
