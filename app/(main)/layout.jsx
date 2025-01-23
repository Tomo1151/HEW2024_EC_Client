import Header from "@/components/Header";
import Container from "@mui/material/Container";
import SubColumn from "@/components/SubColumn";
import AuthFooter from "@/components/AuthFooter";

const MainLayout = ({ children, auth, postForm, media }) => {
  return (
    <>
      <Header />

      <Container maxWidth="sm" disableGutters sx={{ mx: 0 }}>
        {children}
      </Container>
      <Container
        maxWidth="sm"
        disableGutters
        className="sub-column"
        sx={{
          display: "block",
          position: "relative",
          mx: 0,
          width: "400px",
        }}
      >
        <SubColumn />
      </Container>
      {auth}
      {postForm}
      {media}
      {<AuthFooter />}
    </>
  );
};

export default MainLayout;
