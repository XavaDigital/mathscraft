import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import PropTypes from "prop-types";

import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import FormHelperText from "@mui/material/FormHelperText";

import ArgonEditorRoot from "./ArgonEditorRoot";

//https://github.com/jpuri/react-draft-wysiwyg

function ArgonEditor({
  label,
  description,
  error,
  success,
  disabled,
  helperText,
  value,
  onChange,
  ...rest
}) {
  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChange(forFormik);
    setEditorState(editorState);
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
      <ArgonEditorRoot>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ["blockType", "inline", "list", "link", "remove"],
            inline: {
              options: ["bold", "italic", "underline"],
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
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default ArgonEditor;
