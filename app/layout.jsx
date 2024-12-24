import "./globals.css";

import { M_PLUS_Rounded_1c } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import SubColumn from "@/components/SubColumn";

import theme from "@/theme/theme";
import Header from "@/components/Header";

import { UserProvider } from "@/context/UserContext";
import AuthFooter from "@/components/AuthFooter";

export const metadata = {
  title: "HEW 2024 ECサイト",
  description: "HEW 2024 ECサイト",
};

const M_PLUS_Rounded_1cFont = M_PLUS_Rounded_1c({
  weight: "700",
  subsets: ["latin"],
});

console.log(M_PLUS_Rounded_1cFont.className);

export default function RootLayout({ children, auth, postForm }) {
  return (
    <html lang="ja">
      <body
        className={`relative flex bg-white justify-center ${M_PLUS_Rounded_1cFont.className}`}
      >
        <UserProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Header />

              <Container maxWidth="sm" disableGutters sx={{ mx: 0 }}>
                {children}
              </Container>
              <Container
                maxWidth="sm"
                disableGutters
                className="sub-column"
                sx={{
                  display: "block",
                  position: "relative",
                  mx: 0,
                  width: "400px",
                }}
              >
                <SubColumn />
              </Container>

              {auth}
              {postForm}
              {<AuthFooter />}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </UserProvider>
      </body>
    </html>
  );
}
