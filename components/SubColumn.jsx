import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import Trending from "./Trending";
import Link from "next/link";

const SubColumn = () => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        borderLeft: "1px solid #f0f0f0",
        // backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          // display: "flex",
          height: "100vh",
          padding: "1em 2em",
          // flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <SearchBar />
        <Trending />
        <Box
          component="footer"
          sx={{
            fontSize: ".75em",
            color: "#888",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "1em",
              // pt: ".5em",
            }}
          >
            <Link href="/">利用規約</Link>
            <Link href="/">プライバシーポリシー</Link>
            <Link href="/">お問い合わせ</Link>
            <Link href="/patch">パッチノート</Link>

            <p>
              <small>&copy; {new Date().getFullYear()}&nbsp;IH12A-05</small>
            </p>
          </Box>
          <p className="leading-[1em] pt-2 break-keep">
            <small className="footer-annotation">
              これはコンセプトサービスです。
              <wbr />
              実際に金銭のやり取りは
              <wbr />
              発生しません。
            </small>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default SubColumn;
