// import Error404 from "views/authentication/error/404";
// import Error500 from "views/authentication/error/500";

import RegistrationPage from "views/pages/RegistrationPage";
import ThankYouPage from "views/pages/ThankYouPage";
import DownloadPage from "views/pages/DownloadPage";
import ContactPage from "views/pages/ContactPage";

const routes = [
  {
    key: "home",
    route: "/",
    component: <RegistrationPage />,
    protected: "public",
  },
  {
    key: "thanks",
    route: "/thankyou",
    component: <ThankYouPage />,
    protected: "public",
  },
  {
    key: "download",
    route: "/download",
    component: <DownloadPage />,
    protected: "public",
  },
  {
    key: "contact",
    route: "/contact",
    component: <ContactPage />,
    protected: "public",
  },
  // {
  //   key: "error-404",
  //   route: "/authentication/error/404",
  //   component: <Error404 />,
  //   protected: "public",
  // },
  // {
  //   key: "error-500",
  //   route: "/authentication/error/500",
  //   component: <Error500 />,
  //   protected: "public",
  // },
];

export default routes;
