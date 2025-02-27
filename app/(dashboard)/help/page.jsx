import Link from "next/link";
import { Box, Container } from "@mui/material";

const liveHelp = () => {
  return (
    <Container
      component="main"
      sx={{
        // fontFamily: "monospace",
        backgroundColor: "white",
        maxWidth: "800px",
        my: { xs: 0, sm: "2em" },
        p: { xs: "1em", sm: "1em 2.5em" },
        mx: "auto",
        borderRadius: "0.375em",
        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
      }}
      className="patch"
    >
      <Box className="m-[3rem]">
        <h1 className="text-3xl">ヘルプ</h1>
        <h2 className="text-2xl mt-[2rem]">目次</h2>
        <ol className="list-disc list-outside ml-[1.5rem] mt-[2rem]">
          <li>
            <Link href={"/help/live"} className="underline">
              ライブ出品
            </Link>
          </li>
        </ol>
      </Box>
    </Container>
  );
};

export async function generateMetadata() {
  return {
    title: `ヘルプ | Miseba`,
    description: "Misebaのヘルプページ",
  };
}

export default liveHelp;
