import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import ArgonBox from "components/ArgonBox";

import PageLayout from "./PageLayout";

import Footer from "./components/AuthFooter";

function AuthLayout({ button, image, children }) {
  return (
    <PageLayout>
      <>
        {
          //TODO Add logo element here
        }
      </>
      <ArgonBox
        display="grid"
        alignItems="center"
        width="100%"
        height="100vh"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ArgonBox px={1} width="100%" mx="auto">
          <Grid container justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              {children}
            </Grid>
          </Grid>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of AuthLayout
AuthLayout.defaultProps = {
  title: "",
  description: "",
  button: { color: "info" },
};

// Typechecking props for the AuthLayout
AuthLayout.propTypes = {
  button: PropTypes.object,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
