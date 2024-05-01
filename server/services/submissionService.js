const Submission = require("../models/submission");
const moment = require("moment");
const { Parser } = require("json2csv");
const https = require("follow-redirects").https;
// const fs = require("fs");

const emailService = require("./emailService");
// const MAKE_URL = process.env.MAKE_URL;

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
    "address1",
    "address2",
    "townCity",
    "postcode",
    "comments",
    "date",
  ];
  const opts = { fields };

  Submission.find({})
    .then((subs) => {
      if (subs.length == 0) {
        res.json({
          success: false,
          msg: "No submissions found",
        });
      } else {
        subs.forEach((sub) => {
          sub.date = moment(sub.date_created)
            .local()
            .format("YYYY-MM-DD kk:mm:ss");
        });
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
    hostname: "hook.us1.make.com",
    path: "/v1wnlpndqekkzskp2uw7nmrjikp4k7kd",
    headers: {
      Cookie:
        "__cf_bm=t9R.ZDRixuAwtPwwL.Fhq1qvCY0xrwvmdggOJc25BCg-1714486124-1.0.1.1-Vx9D1Arnec4lo5RZQ6IHp6T00XQRpJpkRXl7.8QLXeYSUNNnAUwTYC3Be8vRuhkj7HOykqI9ixFoe3b2ABcm6A",
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
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.write(JSON.stringify(values));

  req.end();
};
