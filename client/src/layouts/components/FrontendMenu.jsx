import DefaultNavbar from "components/NavBar/DefaultNavbar";

import pageRoutes from "routes/menu.page";

const FrontendMenu = () => {
  return (
    <DefaultNavbar
      routes={pageRoutes}
      action={{
        type: "internal",
        route: "/fundatrap",
        label: "Fund a Trap",
        color: "success",
        variant: "gradient",
      }}
    />
  );
};
export default FrontendMenu;
