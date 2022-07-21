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
  school: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  addressCorrect: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  townCity: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
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
