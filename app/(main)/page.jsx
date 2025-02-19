import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

import { Container } from "@mui/material";

import MainColumn from "@/components/MainColumn";
import SubColumn from "@/components/SubColumn";

export default function App() {
  return <MainColumn />;
}

export async function generateMetadata() {
  return {
    title: "Miseba",
    description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
    keywords: "作品販売, 作品, クリエイター, 販売, イラスト, デザイン, 作家",
    openGraph: {
      type: "website",
      title: "Miseba",
      description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
      url: "https://miseba.syntck.com",
      images: {
        url: `${process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001"}/miseba_ogp.png`,
        type: "image/png",
        width: 3000,
        height: 1564,
      },
      site_name: "Miseba",
      locale: "ja_JP",
    },
    twitter: {
      type: "website",
      card: "summary",
      siteName: "Miseba",
      title: "Miseba",
      description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
      images: {
        url: `${process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3001"}/miseba_ogp.png`,
        alt: "Miseba",
        width: 3000,
        height: 1564,
      },
    },
  };
}
