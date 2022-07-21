import PropTypes from "prop-types";
import Flatpickr from "react-flatpickr";

import ArgonInput from "components/ArgonInput";

import "flatpickr/dist/flatpickr.css";

//https://flatpickr.js.org/options/

function ArgonDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <ArgonInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Setting default values for the props of ArgonDatePicker
ArgonDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the ArgonDatePicker
ArgonDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default ArgonDatePicker;
