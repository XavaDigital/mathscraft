const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", function (req, res) {
  res.json({
    success: true,
    message: "Welcome to the API",
  });
});

module.exports = router;
