// import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HEW 2024 ECサイト",
  description: "HEW 2024 ECサイト",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <AuthProvider>
        <body className={`bg-gray-100 pt-[80px]`}>
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
