import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { sendMessage } from "services/submissions";

import { Alert, Card, CardContent, CardHeader, CircularProgress, Grid } from "@mui/material";
import {
  ArgonBox,
  ArgonTypography,
  ArgonButton,
  ArgonInput,
  ArgonSelect,
  ArgonRadio,
} from "components/ArgonComponents";

import SnackBar from "components/SnackBar";
import { useSnackbar } from "components/SnackBar/useSnackBar";

const RegistrationPage = () => {
  const initialState = {
    name: "",
    email: "",
    subject: "Maths Craft in a Box query",
    message: "",
  };

  const [error, setError] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const navigate = useNavigate();

  const { isSBActive, SBoptions, closeSB, openSB } = useSnackbar();

  const validationSchema = Yup.object({
    name: Yup.string("Enter a first name").required("Please enter a name"),
    email: Yup.string("Enter an email")
      .email("Please enter a valid email")
      .required("Email is required"),
    subject: Yup.string("Enter a subject").required("Please enter a subject"),
    message: Yup.string("Add any other message").required("Please enter a message"),
  });

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values, actions) => {
    setError("");
    setInProgress(true);

    sendMessage(values)
      .then((res) => {
        let { data } = res;
        if (data.success) {
          openSB({
            title: "Success",
            content: "Your message has been successfully submitted",
            color: "success",
          });
        } else {
          setError(data.msg);
          openSB({
            title: "There was a problem",
            content: data.msg,
            color: "error",
            icon: "error",
          });
        }
        setInProgress(false);
        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <SnackBar options={SBoptions} open={isSBActive} close={closeSB} />

      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={10} sm={8} md={6} lg={6} xl={4}>
          <Card
            sx={{
              overflow: "visible",

              display: "grid",
            }}
          >
            <CardHeader
              title={"Contact Us"}
              titleTypographyProps={{ variant: "h2", fontWeight: "800" }}
            />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <ArgonInput
                    type="text"
                    name="name"
                    label="Your Name"
                    placeholder="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <ArgonInput
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Your School Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <ArgonInput
                    type="text"
                    name="subject"
                    label="Message Subject"
                    placeholder="Message Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <ArgonInput
                    type="text"
                    name="message"
                    label="Your Message"
                    placeholder="Your message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    multiline
                    rows={5}
                  />
                </Grid>
              </Grid>
              <>
                {error && (
                  <ArgonBox mt={4}>
                    <Alert severity="error">{error}</Alert>
                  </ArgonBox>
                )}
                {!inProgress ? (
                  <ArgonBox mt={4}>
                    <ArgonButton type="submit">Submit</ArgonButton>
                  </ArgonBox>
                ) : (
                  <>
                    <ArgonBox mt={4} textAlign="center">
                      <CircularProgress color="success" />{" "}
                      <ArgonTypography variant="body2" pb="3" color="text">
                        Submitting... Please wait
                      </ArgonTypography>
                    </ArgonBox>
                  </>
                )}
              </>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegistrationPage;
