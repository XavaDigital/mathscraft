import { styled } from "@mui/material/styles";
import { fontWeight } from "@mui/system";

export default styled("div")(({ theme }) => {
  const { palette, borders, typography } = theme;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text } = palette;

  return {
    "& .argonRadioGroup": {
      paddingLeft: "2em",
      "& .MuiFormControlLabel-label": {
        fontWeight: "initial",
      },
    },
  };
});
