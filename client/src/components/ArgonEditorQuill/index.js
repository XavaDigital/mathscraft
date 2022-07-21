// react-quill components
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import FormHelperText from "@mui/material/FormHelperText";

// react-quill styles
import "react-quill/dist/quill.snow.css";

// Custom styles for the ArgonEditor
import ArgonEditorRoot from "components/ArgonEditor/ArgonEditorRoot";

function ArgonEditor({ label, description, error, success, disabled, helperText, ...rest }) {
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
      <ArgonEditorRoot>
        <ReactQuill
          theme="snow"
          modules={{
            clipboard: {
              matchVisual: false,
            },
          }}
          {...rest}
        />
      </ArgonEditorRoot>
      {error && helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
    </>
  );
}

ArgonEditor.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
};

export default ArgonEditor;
