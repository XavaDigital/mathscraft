// @mui material components
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme }) => {
  const { palette, borders, typography } = theme;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text } = palette;

  return {
    "& .ql-toolbar": {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
    },

    "& .ql-container": {
      whiteSpace: "pre-wrap",
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
    },

    "& .ql-editor": {
      whiteSpace: "pre-wrap",
      "& p": {
        fontSize: size.md,
        color: "#666666",
        // color: text.main,
      },

      "& ul li": {
        fontSize: size.md,
        color: "#666666",
        // color: text.main,
      },
    },
  };
});
