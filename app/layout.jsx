import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/theme/theme";
import Header from "@/components/Header";

import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "HEW 2024 ECサイト",
  description: "HEW 2024 ECサイト",
};

export default function RootLayout({ children, auth }) {
  return (
    <html lang="ja">
      <AuthProvider>
        <body className={`flex bg-gray-100`}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />
              {children}
              {auth}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
