const Submission = require("../models/submission");
const { Parser } = require("json2csv");

const emailService = require("./emailService");

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
    "address1",
    "address2",
    "townCity",
    "postcode",
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
