const Submission = require("../models/submission");
const moment = require("moment");
const { Parser } = require("json2csv");
const https = require("follow-redirects").https;
const fs = require("fs");

const emailService = require("./emailService");
const METAAPI_KEY = process.env.METAAPI_KEY;

module.exports.getAll = (req, res) => {
  Submission.find({})
    .then((subs) => {
      if (subs.length == 0) {
        res.json({
          success: false,
          msg: "No submissions found",
        });
      }
      res.json({
        success: true,
        subs,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: err.message,
      });
    });
};

module.exports.add = (values, res) => {
  values.date = moment().local().format("YYYY-MM-DD kk:mm:ss");
  addToSheet(values);
  Submission.create(values)
    .then((submission) => {
      emailService
        .submissionAdded(values)
        .then(() => {
          res.json({
            success: true,
            id: submission._id,
            msg: "Successfully added submission",
          });
        })
        .catch((err) => {
          res.json({ success: false, msg: err.message });
        });
    })
    .catch((err) => {
      res.json({ success: false, msg: err.message });
    });
};

module.exports.download = (res) => {
  const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "schoolName",
    "addressCorrect",
    "comments",
  ];
  const opts = { fields };

  Submission.find({})
    .then((subs) => {
      if (subs.length == 0) {
        res.json({
          success: false,
          msg: "No submissions found",
        });
      }
      try {
        const parser = new Parser(opts);
        const csv = parser.parse(subs);
        return emailService
          .downloadSubmissions(csv)
          .then(() => {
            return res.json({
              success: true,
            });
          })
          .catch((err) => {
            res.json({ success: false, msg: err.message });
          });
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: err.message,
      });
    });
};

module.exports.message = (values, res) => {
  emailService
    .sendEnquiryMessage(values)
    .then(() => {
      res.json({
        success: true,
        msg: "Successfully added message",
      });
    })
    .catch((err) => {
      res.json({ success: false, msg: err.message });
    });
};

const addToSheet = (values) => {
  const options = {
    method: "POST",
    hostname: "api.meta-api.io",
    path: "/api/spells/62f06efddff527d5a5a20d39/runSync",
    headers: {
      apikey: METAAPI_KEY,
      "Content-Type": "application/json",
    },
    maxRedirects: 20,
  };

  const req = https.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      // const body = Buffer.concat(chunks);
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.write(JSON.stringify(values));

  req.end();
};
