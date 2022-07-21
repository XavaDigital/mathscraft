import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";

import Select from "react-select";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { FormHelperText } from "@mui/material";

import colors from "assets/theme/base/colors";
import { useArgonController } from "context";

import styles from "components/ArgonSelect/styles";

const ArgonSelect = forwardRef(
  (
    { label, options, value, onChange, description, size, error, success, helperText, ...rest },
    ref
  ) => {
    const [controller] = useArgonController();
    const { darkMode } = controller;
    const { light } = colors;

    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
      setCurrentValue(options.filter((option) => option.value === value)[0]);
    }, [value]);

    const _onChange = (e) => {
      onChange(e.value);
    };

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
        <Select
          {...rest}
          ref={ref}
          value={currentValue}
          options={options}
          onChange={_onChange}
          styles={styles(size, error, success, darkMode)}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: light.main,
              primary: light.main,
            },
          })}
        />
        {error && helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
      </>
    );
  }
);

// Setting default values for the props of ArgonSelect
ArgonSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the ArgonSelect
ArgonSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default ArgonSelect;
