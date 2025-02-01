import "./globals.css";

import { M_PLUS_Rounded_1c } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/theme/theme";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: "HEW 2024 ECサイト",
  description: "HEW 2024 ECサイト",
};

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
    </html>
  );
}
