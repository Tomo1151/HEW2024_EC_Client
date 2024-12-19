import { Box } from "@mui/material";
import ArrowBackButton from "@/components/ArrowBackButton";

const MainColumnHeader = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        color: "#333",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        borderBottom: "2px solid #f0f0f0",
        px: 2,
        py: 1,
        zIndex: 39,
      }}
    >
      <Box sx={{ mr: 2 }}>
        <ArrowBackButton />
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainColumnHeader;
