import "./globals.css";

import Script from "next/script";

import { M_PLUS_Rounded_1c } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/theme/theme";
import { UserProvider } from "@/context/UserContext";

// export const metadata = {
//   title: "Miseba",
//   description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
//   keywords: "作品販売, 作品, クリエイター, 販売, イラスト, デザイン, 作家",
//   openGraph: {
//     type: "website",
//     title: "Miseba",
//     description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
//     url: "https://miseba.syntck.com",
//     // images: {
//     //   url: "/miseba_ogp.png",
//     //   type: "image/png",
//     //   width: 3000,
//     //   height: 1564,
//     // },
//     site_name: "Miseba",
//     locale: "ja_JP",
//   },
//   twitter: {
//     type: "website",
//     // card: "summary",
//     siteName: "Miseba",
//     title: "Miseba",
//     description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
//     // images: {
//     //   url: "/miseba_ogp.png",
//     //   alt: "Miseba",
//     //   width: 3000,
//     //   height: 1564,
//     // },
//   },
// };

const M_PLUS_Rounded_1cFont = M_PLUS_Rounded_1c({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const classNames = `mt-[var(--height-header)] sm:mt-0 relative flex bg-white ${M_PLUS_Rounded_1cFont.className}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Miseba",
  alternateName: "ミセバ",
  url: "https://miseba.syntck.com",
  description: "つくる。売る。つながる。作品販売とコミュニケーションの場",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://miseba.syntck.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  sameAs: ["https://miseba.syntck.com"],
  publisher: {
    "@type": "Organization",
    name: "Miseba",
    logo: {
      "@type": "ImageObject",
      url: "https://miseba.syntck.com/miseba_logo_image_ogp.png",
    },
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "WebPage",
          name: "ホーム",
          description: "投稿や商品が流れるタイムラインです",
          url: "https://miseba.syntck.com/",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "WebPage",
          name: "利用規約",
          description: "Misebaの利用規約",
          url: "https://miseba.syntck.com/terms",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "WebPage",
          name: "お問い合わせ",
          description: "Misebaへのお問い合わせページ",
          url: "https://miseba.syntck.com/contact",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "WebPage",
          name: "パッチノート",
          description: "Misebaのアップデート履歴",
          url: "https://miseba.syntck.com/patch",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "WebPage",
          name: "ライブタイムライン",
          description: "ライブ配信の投稿が流れるタイムラインです",
          url: "https://miseba.syntck.com/live",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "WebPage",
          name: "通知",
          description: "Misebaの通知ページ。ログインが必要です。",
          url: "https://miseba.syntck.com/notifications",
          isAccessibleForFree: false,
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "WebPage",
          name: "カート",
          description: "Misebaの買い物カート。ログインが必要です。",
          url: "https://miseba.syntck.com/cart-items",
          isAccessibleForFree: false,
        },
      },
      {
        "@type": "ListItem",
        position: 8,
        item: {
          "@type": "WebPage",
          name: "購入履歴",
          description: "Misebaの購入履歴ページ。ログインが必要です。",
          url: "https://miseba.syntck.com/purchase-history",
          isAccessibleForFree: false,
        },
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body id="root" className={classNames}>
        <UserProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </UserProvider>
      </body>
      <GoogleAnalytics gaId="G-XM9SCJ71H2" />
    </html>
  );
}
