import { Box } from "@mui/material";

const TagHeading = ({ tagName }) => {
  return (
    <Box
      sx={{
        fontSize: "1.5em",
        fontWeight: "bold",
        mb: 2,
        px: 4,
        pt: 2,
        pb: 2,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      #{tagName}
    </Box>
  );
};

export default TagHeading;
