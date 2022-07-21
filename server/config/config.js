module.exports = {
  smtpConf: {
    sender: "admin@mathscraftnz.org",
    host: "smtp.mailgun.org",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    fromName: "Maths Craft New Zealand",
    baseURL: "http://localhost:3000",
  },
};

// module.exports = {
//   smtpConf: {
//     sender: "admin@mathscraftnz.org",
//     host: "smtp.mailgun.org",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     fromName: "Maths Craft New Zealand",
//     baseURL: "http://localhost:3000",
//   }
// };
