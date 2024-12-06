//購入履歴
import { Container } from "@mui/material";
// import MainColumnHeader from "@/components/MainColumnHeader";

export default function PurchaseLayout({ children }) {
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
