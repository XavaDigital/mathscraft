import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { useArgonController, setLayout } from "context";

import ArgonBox from "components/ArgonBox";

function PageLayout({ background, children }) {
  const [controller, dispatch] = useArgonController();
  const { darkMode } = controller;

  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <ArgonBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={darkMode ? "transparent" : background}
      sx={{ overflowX: "hidden" }}
    >
      {/* <FrontendMenu /> */}
      {children}
    </ArgonBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
