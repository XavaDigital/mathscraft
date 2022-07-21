import { forwardRef } from "react";
import PropTypes from "prop-types";

import ArgonInputRoot from "components/ArgonInput/ArgonInputRoot";
import FormHelperText from "@mui/material/FormHelperText";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

import { useArgonController } from "context";

const ArgonInput = forwardRef(
  ({ label, description, size, error, success, disabled, helperText, ...rest }, ref) => {
    const [controller] = useArgonController();
    const { darkMode } = controller;

    return (
      <>
        <ArgonBox mt={1} lineHeight={1} display="inline-block">
          {label && (
            <ArgonTypography component="label" variant="h6" className="field-label">
              {label}
            </ArgonTypography>
          )}
          {description && (
            <ArgonTypography component="div" variant="caption" className="field-description">
              {description}
            </ArgonTypography>
          )}
        </ArgonBox>
        <ArgonInputRoot
          {...rest}
          ref={ref}
          ownerState={{ size, error, success, disabled, darkMode }}
        />
        {error && helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
      </>
    );
  }
);

// Setting default values for the props of ArgonInput
ArgonInput.defaultProps = {
  size: "medium",
  error: false,
  success: false,
  disabled: false,
  helperText: "",
};

// Typechecking props for the ArgonInput
ArgonInput.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
};

export default ArgonInput;
