import { Box, CircularProgress } from "@mui/material";

const CircularLoading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <CircularProgress />
    </Box>
  );
};

export default CircularLoading;
