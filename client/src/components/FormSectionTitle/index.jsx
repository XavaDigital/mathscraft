import React from "react";
import PropTypes from "prop-types";

import { ArgonTypography } from "components/ArgonComponents";

const FormSectionTitle = ({ children }) => {
  return (
    <ArgonTypography
      style={{
        border: "1px solid black",
        borderWidth: "0 0 1px 0",
        marginTop: "30px",
        marginBottom: "15px",
      }}
      variant="h4"
      className="section-title"
    >
      {children}
    </ArgonTypography>
  );
};

FormSectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormSectionTitle;
