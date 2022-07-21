// @mui material components
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme }) => {
  const { palette, borders, typography } = theme;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text } = palette;

  return {
    "& .rdw-editor-toolbar": {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
      border: "1px solid #ccc",
      boxSizing: "border-box",
      padding: "8px",
      marginBottom: "0",
    },

    "& .rdw-editor-main": {
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
      border: "1px solid #ccc",
      fontSize: "1em",
      padding: "8px",
      borderTop: "0",
    },

    "& .rdw-editor-wrapper": {
      // "& p": {
      //   fontSize: size.md,
      //   color: "#666666",
      //   // color: text.main,
      // },
      // "& ul li": {
      //   fontSize: size.md,
      //   color: "#666666",
      //   // color: text.main,
      // },
    },
  };
});
