import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardContent, Grid } from "@mui/material";

import { ArgonBox, ArgonButton, ArgonTypography } from "components/ArgonComponents";

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("scrolling");
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  }, []);

  const redirectContact = () => {
    navigate(`/contact`);
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={11} lg={4}>
        <Card
          sx={{
            overflowY: "visible",
            display: "grid",
          }}
        >
          <CardHeader
            title={"Thank you!"}
            titleTypographyProps={{ variant: "h2", fontWeight: "800" }}
            sx={{ textAlign: "center" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <ArgonBox>
              <ArgonTypography variant="body">
                <p>Thank you for ordering Maths Craft in a Box!</p>
              </ArgonTypography>
              <ArgonTypography variant="body">
                <p>
                  You will receive a confirmation email shortly. If this does not appear in your
                  inbox within the next 10 minutes, please check your spam folder and add us (
                  <a href="mailto:box@mathscraftnz.org">box@mathscraftnz.org</a>) to your contacts.
                  If you don&apos;t receive an email or if you have any questions, please{" "}
                  <a href="" onClick={redirectContact}>
                    contact us
                  </a>
                  .
                </p>
              </ArgonTypography>
            </ArgonBox>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ThankYouPage;
