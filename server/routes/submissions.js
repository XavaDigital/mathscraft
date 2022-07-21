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

router.get("/:id", function (req, res) {
  const id = req.params.id;
  return submissionService.get(id, res);
});

// router.put("/:id", function (req, res) {
//   const values = req.body.values;
//   const { _id } = values;

//   return submissionService.update(_id, values, res);
// });

router.post("/", (req, res) => {
  return submissionService.add(req.body.values, res);
});

// router.delete("/", (req, res) => {
//   return submissionService.delete(req.body.values, res);
// });

module.exports = router;
