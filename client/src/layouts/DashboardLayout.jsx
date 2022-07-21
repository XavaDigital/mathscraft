import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { useArgonController, setLayout } from "context";

import ArgonBox from "components/ArgonBox";
import Sidenav from "./components/Sidenav";
// import AdminNavbar from "./components/AdminNavBar";
import AdminFooter from "./components/AdminFooter";

import adminMenu from "routes/menu.admin";

// Images
import brand from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

function DashboardLayout({ bgColor, children, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, sidenavColor, darkSidenav, darkMode } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const background = darkMode && !bgColor ? "transparent" : bgColor;

  const [onMouseEnter, setOnMouseEnter] = useState(false);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <ArgonBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <Sidenav
        color={sidenavColor}
        brand={darkSidenav || darkMode ? brand : brandDark}
        brandName="PFDP"
        routes={adminMenu}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <ArgonBox
        bgColor={background || "info"}
        height="300px"
        width="100vw"
        position="absolute"
        top={0}
        left={0}
        sx={darkMode && { bgColor: ({ palette: { background } }) => background.default }}
        {...rest}
      />
      {/* <AdminNavbar /> */}
      {children}
      <AdminFooter />
    </ArgonBox>
  );
}

DashboardLayout.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
