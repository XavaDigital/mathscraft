import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Argon Dashboard 2 PRO MUI themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import stylesCSS from "assets/css/styles.css";
import style from "assets/css/style.scss";

// Argon Dashboard 2 PRO MUI routes
import routes from "routes/routes";

import PageLayout from "layouts/PageLayout";

// Argon Dashboard 2 PRO MUI contexts
import { useArgonController, setOpenConfigurator } from "context";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";

export default function App() {
  const [controller, dispatch] = useArgonController();
  const { darkMode } = controller;

  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        switch (route.protected) {
          case "public":
          default:
            return (
              <Route
                exact
                path={route.route}
                element={<PageLayout>{route.component}</PageLayout>}
                key={route.key}
              />
            );
        }
      }
      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
