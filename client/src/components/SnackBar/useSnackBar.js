import React from "react";

export function useSnackbar() {
  const [isSBActive, setIsActive] = React.useState(false);
  const [SBoptions, setOptions] = React.useState();

  React.useEffect(() => {
    if (isSBActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  }, [isSBActive]);

  const openSB = (options) => {
    setOptions(options);
    setIsActive(true);
  };

  const closeSB = () => {
    setIsActive(false);
  };

  return { isSBActive, SBoptions, closeSB, openSB };
}
