/* eslint-disable no-console */
// sweetalert2 components
import Swal from "sweetalert2";

// Sweet Alerts page components
import Template from "./template";

const SweetAlert = ({ options }) => {
  let defaultOptions = {
    title: "Auto close alert!",
    html: "I will close in <b></b> milliseconds.",
    timer: 2000,
  };
  //let timerInterval;

  const showAlert = () =>
    Swal.fire({ ...defaultOptions, ...options }).then((result) => {
      /* Read more about handling dismissals below */
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //     console.log("I was closed by the timer");
      //   }
    });

  return <Template title="A message with auto close" action={showAlert} />;
};

SweetAlert.defaultProps = {};

SweetAlert.propTypes = {
  options: PropTypes.object,
};

export default SweetAlert;
