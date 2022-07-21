import React, { useEffect } from "react";

import { Card, CardHeader, CardMedia, CardContent, Grid } from "@mui/material";

import { downloadSubmissions } from "services/submissions";

const DownloadPage = () => {
  useEffect(() => {
    downloadSubmissions();
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
          <CardHeader
            title={"Download"}
            titleTypographyProps={{ variant: "h2", fontWeight: "800" }}
            sx={{ textAlign: "center" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <p>{`A CSV file of submissions has been sent to the admin's email address`}</p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DownloadPage;
