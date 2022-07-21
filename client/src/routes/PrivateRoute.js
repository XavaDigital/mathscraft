import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// import { isLoggedIn } from "services/auth";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  // if (!isLoggedIn()) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
