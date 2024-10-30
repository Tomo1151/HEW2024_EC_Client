import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

import { Container } from "@mui/material";

import MainColumn from "@/components/MainColumn";
console.log();
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{
          ml: "3em",
        }}
      >
        <MainColumn />
      </Container>
    </ThemeProvider>
  );
}
