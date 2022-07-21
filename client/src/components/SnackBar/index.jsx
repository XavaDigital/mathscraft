import React from "react";
import propTypes from "prop-types";

import { ArgonSnackbar } from "components/ArgonComponents";

const SnackBar = ({ options, open, close }) => {
  const defaultOptions = {
    color: "success",
    icon: "check",
    title: "Success",
    content: "The operation was successful",
    dateTime: "Just now",
  };
  const { color, icon, title, content, dateTime } = { ...defaultOptions, ...options };

  return (
    <ArgonSnackbar
      color={color}
      icon={icon}
      title={title}
      content={content}
      dateTime={dateTime}
      open={open}
      onClose={close}
      close={close}
    />
  );
};

SnackBar.propTypes = {
  options: propTypes.object,
  open: propTypes.bool,
  close: propTypes.func,
};

export default SnackBar;
