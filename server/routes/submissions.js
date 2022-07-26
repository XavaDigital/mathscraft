const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const submissionService = require("../services/submissionService");

router.get("/all", function (req, res) {
  return submissionService.getAll(req, res);
});

router.get("/download", function (req, res) {
  return submissionService.download(res);
});

router.post("/", (req, res) => {
  return submissionService.add(req.body.values, res);
});

router.post("/message", (req, res) => {
  return submissionService.message(req.body.values, res);
});

module.exports = router;
