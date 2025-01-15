import { Box } from "@mui/material";
import DashboardHeader from "@/components/DashboardHeader";

const DashboardLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        mt: {
          xs: "calc(var(--height-header)*-1)",
          sm: "0",
        },
      }}
    >
      <DashboardHeader />
      {children}
    </Box>
  );
};

export default DashboardLayout;
