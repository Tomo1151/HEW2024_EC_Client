import { headers } from "next/headers";

const SearchLayout = ({ children }) => <>{children}</>;

export async function generateMetadata({}) {
  return {
    title: `検索 | Miseba`,
    metadataBase: new URL(`https://${headers().get("host")}`),
    description: "ユーザーによる検索ページ",
  };
}

export default SearchLayout;
