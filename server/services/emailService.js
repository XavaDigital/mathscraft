const nodemailer = require("nodemailer");
const { smtpConf } = require("../config/config");

const transporter = nodemailer.createTransport(smtpConf);
const { fromName, sender, baseURL } = smtpConf;

module.exports.forgotPassword = (email, user) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        // eslint-disable-next-line max-len
        html:
          "<p>Hi,<br/>If you want to reset your password, please click on the following link:</p>" +
          `<p><a href="${baseURL}/resetpassword/${user._id}?token=${user.resetToken}">${baseURL}/resetpassword/${user._id}?token=${user.resetToken}</a><br>` +
          `<br>If you did not request your password to be reset, you can safely ignore this message.</p>`, // html body
      })
      .then(() => {
        resolve();
      });
  });
};

module.exports.confirmEmail = (email, user) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: email, // list of receivers
        subject: "Confirm Email", // Subject line
        // eslint-disable-next-line max-len
        html:
          "<p>Hi,<br/>Please confirm your email address by clicking on the following link:</p>" +
          `<p><a href="${baseURL}/confirmemail/${user._id}">${baseURL}/confirmemail/${user._id}</a><br>` +
          `<br>If you did not ask for it, please let us know immediately at <a href="mailto:${sender}">${sender}</a></p>`, // html body
      })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.newUserPasswordRest = (email, userId) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: email, // list of receivers
        subject: "Welcome! Please set your password", // Subject line
        // eslint-disable-next-line max-len
        html:
          "<p>Hi,<br/>Welcome to Give a Trap. You have been added as a user by a system administrator.</>" +
          "<p>You must set your password to allow you to login, please click on the following link:</p>" +
          `<p><a href="${baseURL}/resetpassword/${userId}">${baseURL}/resetpassword/${userId}</a><br>` +
          `<br>If you did not request to be added as a user, please let us know immediately at <a href="mailto:${sender}">${sender}</a></p>`, // html body
      })
      .then(() => {
        resolve();
      });
  });
};

module.exports.submissionAdded = (email, firstName) => {
  // TODO log the request and email sent

  return new Promise((resolve, reject) => {
    return transporter
      .sendMail({
        from: `"${fromName}" <${sender}>`,
        to: email, // list of receivers
        subject: "Your registration has been received", // Subject line
        // eslint-disable-next-line max-len
        html:
          `<p>Hi ${firstName},</p><p>Your registration for the Maths Craft in a Box has been received.</p>` +
          "<p>We expect to be shipping the boxes out by XXXX.</p>" +
          `<p>If you have any additional queries or quiestions please send them through via email to <a href="mailto:${sender}">${sender}</a></p>`, // html body
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
        to: "david@xavadigital.com", // list of receivers
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
