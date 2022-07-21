import React, { useEffect } from "react";

import { Card, CardHeader, CardMedia, CardContent, Grid } from "@mui/material";

import headerImage from "assets/images/MathsCraftInBox_animated-1.gif";

const ThankYouPage = () => {
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

  return (
    <Grid container justifyContent="center" sx={{ height: "100%" }} mt={6} mb={6} spacing={3}>
      <Grid item xs={11} lg={4}>
        <Card
          sx={{
            overflowY: "visible",
            boxShadow: ({ boxShadows: { md } }) => md,
            display: "grid",
          }}
        >
          <img
            src={headerImage}
            alt="Maths Craft in a Box"
            style={{ maxWidth: "100%", padding: "0 10px" }}
          />
          <CardHeader
            title={"Thank you!"}
            titleTypographyProps={{ variant: "h2", fontWeight: "800" }}
            sx={{ textAlign: "center" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <p>Thank you for registering for a Maths Craft in a Box pack.</p>
            <p>
              You will receive a registration confirmation email. If the email does not appear in
              your invox within the next 5 minutes, please check your spam folder and add our email
              to your contacts.
            </p>
            <p>We expect to be shipping these packs out within the next 2 weeks.</p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ThankYouPage;
