import { Container } from "@mui/material";
// import MainColumnHeader from "@/components/MainColumnHeader";

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
