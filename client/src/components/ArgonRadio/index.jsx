import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import FormHelperText from "@mui/material/FormHelperText";

import ArgonRadioRoot from "./ArgonRadioRoot";

import { RadioGroup, Radio, FormLabel, FormControl, FormControlLabel } from "@mui/material";

function ArgonRadio({
  label,
  description,
  error,
  success,
  disabled,
  helperText,
  options,
  ...rest
}) {
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
      <ArgonRadioRoot>
        <RadioGroup name="radio-buttons-group" className="argonRadioGroup" {...rest}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </ArgonRadioRoot>
      {error && helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
    </>
  );
}

ArgonRadio.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default ArgonRadio;
