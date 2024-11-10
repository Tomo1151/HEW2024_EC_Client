import { Container } from "@mui/material";

export default function PostLayout({ children }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        ml: "3em",
      }}
    >
      {children}
    </Container>
  );
}
