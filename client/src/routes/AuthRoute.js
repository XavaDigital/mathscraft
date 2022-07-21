import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// import { isLoggedIn } from "services/auth";

const AuthRoute = ({ children }) => {
  let location = useLocation();

  // if (isLoggedIn()) {
  //   return <Navigate to="/admin" state={{ from: location }} />;
  // }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
