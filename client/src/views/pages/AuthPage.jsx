import React, { useEffect } from "react";

import { Card, CardHeader, CardMedia, CardContent, Grid } from "@mui/material";

import { downloadSubmissions } from "services/submissions";

const DownloadPage = () => {
  function openPopup() {
    const height = window.screen.height - 300;
    const width = 500;
    let left = window.screen.width - width;
    left = left > 0 ? left / 2 : 0;
    let top = window.screen.height - height;
    top = top > 0 ? top / 2 : 0;
    window.open(
      "https://api.meta-api.io/api/oauth/connect/62335d38045f612ed05d596f?targetApiSecurity=62f059cadff527d5a5a1ed7a&userId=YOUR_USER_ID",
      "OAuth Authorization",
      `menubar=no, status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  }

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={11} lg={4}>
        <Card
          sx={{
            overflowY: "visible",
            display: "grid",
          }}
        >
          <button type="button" onClick={openPopup}>
            Link my account
          </button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DownloadPage;
