import { Box } from "@mui/material";

const SubColumn = () => {
  return (
    <Box sx={{ position: "sticky", top: 0, borderLeft: "1px solid #f0f0f0" }}>
      <Box sx={{ height: "100vh" }}></Box>
    </Box>
  );
};

export default SubColumn;
