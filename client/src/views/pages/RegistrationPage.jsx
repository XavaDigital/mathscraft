import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addSubmission } from "services/submissions";

import { Alert, Card, CardContent, CardHeader, CircularProgress, Grid } from "@mui/material";
import {
  ArgonBox,
  ArgonTypography,
  ArgonButton,
  ArgonInput,
  ArgonSelect,
  ArgonRadio,
} from "components/ArgonComponents";

import FormSectionTitle from "components/FormSectionTitle";
import SnackBar from "components/SnackBar";
import { useSnackbar } from "components/SnackBar/useSnackBar";

import headerImage from "assets/images/MathsCraftInBox_animated-1.gif";

import { schools } from "./schools";

const RegistrationPage = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    schoolName: "",
    addressCorrect: "true",
    address1: "",
    address2: "false",
    townCity: "",
    postcode: "",
    comments: "",
  };

  const [error, setError] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [schoolSelected, setSchoolSelected] = useState(false);

  const navigate = useNavigate();

  const { isSBActive, SBoptions, closeSB, openSB } = useSnackbar();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string("Enter a first name").required("Please enter a first name"),
    lastName: Yup.string("Enter a last name").required("Please enter a last name"),
    email: Yup.string("Enter an email")
      .email("Please enter a valid email")
      .required("Email is required"),
    phone: Yup.string()
      .required("Please enter a phone number")
      .matches(phoneRegExp, "Phone number is not valid. It must contain only numbers and spaces"),
    school: Yup.string("Please indicate your school").required(
      "Please indicate the school you are affiliated with"
    ),
    schoolName: Yup.string("Please enter your school name").required(
      "Please enter your school name"
    ),
    addressCorrect: Yup.string("Please indicate if the address is correct").required(
      "Please indicate if the address is correct"
    ),
    address1: Yup.string("Please enter your address").required("Please enter your address"),
    address2: Yup.string("Please enter the correct address"),
    townCity: Yup.string("Town/city is required").required("Town/city is required"),
    postcode: Yup.string("Enter a postcode").required("Please enter your postcode"),
    comments: Yup.string("Add any other comments"),
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
    // console.log(values);

    addSubmission(values)
      .then((res) => {
        let { data } = res;
        onSave(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSave = (data) => {
    setTimeout(() => {
      if (data.success) {
        navigate(`/thankyou`);
        openSB({
          title: "Success",
          content: "Registration has been successfully submitted",
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
    }, 3000);
  };

  // useEffect(() => {
  //   if (Object.values(formik.errors).length > 0) {
  //     setError("Some fields are invalid. Please check and try again");
  //   } else setError("");
  // }, [formik.errors]);

  const onSchoolChange = (val) => {
    const school = schools.find((school) => school.value === val);
    if (school && school.value !== "0") {
      formik.setFieldValue("schoolName", school.label);
      formik.setFieldValue("address1", school.address1);
      formik.setFieldValue("address2", school.address2);
      formik.setFieldValue("townCity", school.townCity);
      formik.setFieldValue("postcode", school.postcode);
    } else {
      formik.setFieldValue("schoolName", "");
      formik.setFieldValue("address1", "");
      formik.setFieldValue("address2", "");
      formik.setFieldValue("townCity", "");
      formik.setFieldValue("postcode", "");
      formik.setFieldValue("addressCorrect", "false");
    }
    if (school) {
      setSchoolSelected(school);
    }
    formik.setFieldValue("school", val);
  };

  // useEffect(() => {
  //   formik.validateForm();
  // }, [schoolSelected]);

  const redirectContact = () => {
    navigate(`/contact`);
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
            {/* <img
              src={headerImage}
              alt="Maths Craft in a Box"
              style={{ maxWidth: "100%", padding: "0 10px" }}
            /> */}
            <CardHeader
              title={"Order Now"}
              titleTypographyProps={{ variant: "h2", fontWeight: "800" }}
            />
            <CardContent>
              <ArgonTypography variant="body">
                Please complete the form below to order your Box. If you have any questions or
                problems completing the form, please <a onClick={redirectContact}>contact us</a>.
              </ArgonTypography>
              <FormSectionTitle variant="h4">Your Details</FormSectionTitle>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <ArgonInput
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="Your First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <ArgonInput
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Your Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <ArgonInput
                    type="text"
                    name="phone"
                    label="Contact Number"
                    placeholder="Your Phone Number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
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
              </Grid>
              <FormSectionTitle variant="h4">Your School</FormSectionTitle>

              <Grid item>
                <ArgonSelect
                  label="School Name"
                  description={
                    <div>
                      Please start typing your school&apos;s name and select your school from the
                      dropdown list. Please <a onClick={redirectContact}>contact us</a> if you
                      can&apos;t find your school or if the postal address listed is incorrect.
                    </div>
                  }
                  placeholder="School Name"
                  options={schools}
                  name="school"
                  type="select"
                  id="school_select"
                  value={formik.values.school}
                  onChange={onSchoolChange}
                  error={formik.touched.school && Boolean(formik.errors.school)}
                  helperText={formik.touched.school && formik.errors.school}
                />
              </Grid>
              {schoolSelected && (
                <>
                  {schoolSelected.value !== "0" && (
                    <>
                      <FormSectionTitle variant="h4">Confirm Postal Address</FormSectionTitle>
                      <Grid item>
                        <div className="address">
                          <p style={{ marginBottom: "0" }}>
                            <b>{schoolSelected.label}</b>
                          </p>
                          <p style={{ marginBottom: "0" }}>{schoolSelected.address1}</p>
                          <p style={{ marginBottom: "0" }}>{schoolSelected.address2}</p>
                          <p style={{ marginBottom: "0" }}>{schoolSelected.townCity}</p>
                          <p style={{ marginBottom: "0" }}>{schoolSelected.postcode}</p>
                        </div>
                      </Grid>
                      <Grid item>
                        <ArgonRadio
                          label="Are the address details listed above correct?"
                          defaultValue={"true"}
                          name="addressCorrect"
                          options={[
                            { value: "true", label: "Yes, these details are correct" },
                            { value: "false", label: "No, these details are not correct" },
                          ]}
                          value={formik.values.addressCorrect}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.addressCorrect && Boolean(formik.errors.addressCorrect)
                          }
                          helperText={formik.touched.addressCorrect && formik.errors.addressCorrect}
                        />
                      </Grid>
                    </>
                  )}

                  {formik.values.addressCorrect === "false" && (
                    <>
                      <Alert severity="warning">
                        Please <a onClick={redirectContact}>contact us</a> if the postal address
                        listed is incorrect or leave a comment in the box below.
                      </Alert>
                    </>
                  )}

                  <FormSectionTitle variant="h4">Other</FormSectionTitle>
                  <Grid item>
                    <ArgonInput
                      type="text"
                      name="comments"
                      label="Comments"
                      placeholder="Any comments you'd like to add"
                      value={formik.values.comments}
                      onChange={formik.handleChange}
                      error={formik.touched.comments && Boolean(formik.errors.comments)}
                      helperText={formik.touched.comments && formik.errors.comments}
                      multiline
                      rows={5}
                    />
                  </Grid>

                  {error && (
                    <ArgonBox mt={4}>
                      <Alert severity="error">{error}</Alert>
                    </ArgonBox>
                  )}
                  {!inProgress ? (
                    <>
                      <ArgonBox mt={4} mb={4}>
                        <ArgonButton id="submit" type="submit" fullWidth>
                          Submit
                        </ArgonButton>
                      </ArgonBox>
                      <ArgonBox>
                        <ArgonTypography variant="body">
                          If you have any questions or problems completing the form, please{" "}
                          <a onClick={redirectContact}>contact us</a>.
                        </ArgonTypography>
                      </ArgonBox>
                    </>
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
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegistrationPage;
