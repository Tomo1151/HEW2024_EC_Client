import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
