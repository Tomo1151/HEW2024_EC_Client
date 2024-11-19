import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/theme/theme";
import Header from "@/components/Header";

import { AuthProvider } from "@/context/AuthContext";
import AuthFooter from "@/components/AuthFooter";

export const metadata = {
  title: "HEW 2024 ECサイト",
  description: "HEW 2024 ECサイト",
};

export default function RootLayout({ children, auth, postForm }) {
  return (
    <html lang="ja">
      <AuthProvider>
        <body className={`flex bg-gray-100`}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />
              {children}
              {auth}
              {postForm}
              {<AuthFooter />}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
