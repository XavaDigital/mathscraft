const nodemailer = require("nodemailer");
const { smtpConf } = require("../config/config");

const transporter = nodemailer.createTransport(smtpConf);
const { fromName, sender, baseURL, ADMIN_EMAIL } = smtpConf;

module.exports.submissionAdded = (values) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: values.email, // list of receivers
        subject: "Thank you for ordering Maths Craft in a Box!", // Subject line
        replyTo: sender,
        // eslint-disable-next-line max-len
        html:
          `<p>Hi ${values.firstName},</p><p>Thank you for ordering Maths Craft in a Box!</p>` +
          "<p>We ship Boxes weekly in batches, so it may take us a few weeks to ship your Box. We will email you with a tracking number once your Box has been sent.</p>" +
          `<p>If you have any questions, or no longer wish to receive a Box, please reply to this email.</p>` +
          "<span>Order Summary:</span>" +
          "<ul>" +
          `<li>Name: ${values.firstName} ${values.lastName}</li>` +
          `<li>Phone: ${values.phone}</li>` +
          `<li>Email: ${values.email}</li>` +
          `<li>Address: ${values.schoolName}, ${values.address1}, ${values.address2}, ${values.townCity}, ${values.postcode}</li>` +
          `<li>Address Correct: ${values.addressCorrect}</li>` +
          (values.comments ? `<li>Comments: ${values.comments}</li>` : "") +
          "</ul>", // html body
      })
      .then(() => {
        resolve();
      });
  });
};

module.exports.downloadSubmissions = (csv) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: ADMIN_EMAIL, // list of receivers
        subject: "Submissions export", // Subject line
        // eslint-disable-next-line max-len
        html: `<p>The submissions CSV export file is attached</p>`,
        attachments: [
          {
            filename: "submissions.csv",
            content: csv,
          },
        ],
      })
      .then(() => {
        resolve();
      });
  });
};

module.exports.sendEnquiryMessage = (values) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: ADMIN_EMAIL, // list of receivers
        subject: values.subject, // Subject line
        // eslint-disable-next-line max-len
        replyTo: values.email,
        html:
          `An enquiry was received from ${values.name} via the registration form` +
          "<ul>" +
          `<li>Name: ${values.name}</li>` +
          `<li>Email: ${values.email}</li>` +
          `<li>Subject: ${values.subject}</li>` +
          `<li>Message: ${values.message}</li>` +
          "</ul>", // html body
      })
      .then(() => {
        resolve();
      });
  });
};
