import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import Trending from "./Trending";

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
      </Box>
    </Box>
  );
};

export default SubColumn;
