const Submission = require("../models/submission");
const { Parser } = require("json2csv");

const emailService = require("./emailService");
// const utils = require("../utils/generalUtils");

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

// module.exports.get = (id, res) => {
//   Group.findOne({ _id: id })
//     .then((group) => {
//       if (group.length == 0) {
//         res.json({
//           success: false,
//           msg: "Group not found",
//         });
//       }
//       res.json({
//         success: true,
//         group,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         success: false,
//         msg: err.message,
//       });
//     });
// };

module.exports.add = (values, res) => {
  Submission.findOne({ school: values.school })
    .then((sub) => {
      if (sub && values.school !== "0") {
        res.json({
          success: false,
          msg: `School has already been registered by ${sub.firstName} ${sub.lastName}`,
        });
      } else {
        Submission.create(values)
          .then((submission) => {
            emailService
              .submissionAdded(values.email, values.firstName)
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
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: err.message,
      });
    });
};

module.exports.download = (res) => {
  const fields = [
    "firstName",
    "lastName",
    "email",
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

// module.exports.update = (id, values, res) => {
//   delete values["_id"];
//   delete values["date_created"];

//   Group.findOneAndUpdate({ _id: id }, values)
//     .then((group) => {
//       res.json({
//         success: true,
//         msg: "Successfully updated group",
//       });
//     })
//     .catch((err) => {
//       res.json({
//         success: false,
//         msg: err.message,
//       });
//     });
// };

// module.exports.delete = (id, res) => {
//   Group.findOneAndDelete({ _id: id })
//     .then((group) => {
//       res.json({
//         success: true,
//         msg: "Successfully deleted group",
//       });
//     })
//     .catch((err) => {
//       res.json({
//         success: false,
//         msg: err.message,
//       });
//     });
// };
