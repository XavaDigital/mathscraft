import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { logout } from "services/auth";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";

import Breadcrumbs from "components/NavBar/Breadcrumbs";
import NotificationItem from "components/NavBar/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "./styles";

// Argon Dashboard 2 PRO MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

const DashboardNavbar = ({ absolute, light, isMini }) => {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogout = () => {
    logout().then((res) => {
      if (res) navigate("/login");
    });
  };

  const renderNotifications = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={openMenu && openMenu.getAttribute("aria-controls") === "notification-menu"}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  const renderAccount = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={openMenu && openMenu.getAttribute("aria-controls") === "account-menu"}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={transparentNavbar ? light : false}
          />
          <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </ArgonBox>
        {isMini ? null : (
          <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <ArgonBox pr={1}>
              <ArgonInput
                placeholder="Type here..."
                startAdornment={
                  <Icon fontSize="small" style={{ marginRight: "6px" }}>
                    search
                  </Icon>
                }
              />
            </ArgonBox> */}
            <ArgonBox color={light ? "white" : "inherit"}>
              <IconButton
                sx={navbarIconButton}
                size="small"
                aria-haspopup="true"
                variant="contained"
                aria-controls="account-menu"
                onClick={handleOpenMenu}
              >
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light && transparentNavbar ? white.main : dark.main,
                  })}
                >
                  account_circle
                </Icon>
                <ArgonTypography
                  variant="button"
                  fontWeight="medium"
                  color={light && transparentNavbar ? "white" : "dark"}
                >
                  Account
                </ArgonTypography>
              </IconButton>
              {renderAccount()}
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>

              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon>notifications</Icon>
              </IconButton>
              {renderNotifications()}
            </ArgonBox>
          </ArgonBox>
        )}
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
