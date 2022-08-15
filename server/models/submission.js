const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  school: {
    type: String,
  },
  schoolName: {
    type: String,
    required: true,
  },
  addressCorrect: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  townCity: {
    type: String,
  },
  postcode: {
    type: String,
  },
  comments: {
    type: String,
  },
  instagram: {
    type: String,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
