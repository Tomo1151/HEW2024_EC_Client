import { Container } from "@mui/material";

export default function UserLayout({ children }) {
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
