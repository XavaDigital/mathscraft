const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
// const https = require("https");
const http = require("http");
// const fs = require("fs");
const cors = require("cors");
const path = require("path");
// const html = fs.readFileSync("index.html");

require("dotenv").config();

// Instantiate express
const app = express();
app.use(compression());

// DB Config

// Connect to MongoDB
mongoose
  .connect(process.env.DB_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Options, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Express body parser
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REACT BUILD for production
if (process.env.NODE_ENV === "PROD") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Initialize routes middleware
app.use("/", require("./routes/default"));
app.use("/api/", require("./routes/default"));
app.use("/api/submissions", require("./routes/submissions"));

const PORT = process.env.PORT || 3000;

const server = http.createServer({}, app);
// const server = http.createServer(function (req, res) {
//   if (req.method === "POST") {
//     let body = "";

//     req.on("data", function (chunk) {
//       body += chunk;
//     });

//     req.on("end", function () {
//       if (req.url === "/") {
//         log("Received message: " + body);
//       } else if ((req.url = "/scheduled")) {
//         log(
//           "Received task " +
//             req.headers["x-aws-sqsd-taskname"] +
//             " scheduled at " +
//             req.headers["x-aws-sqsd-scheduled-at"]
//         );
//       }

//       res.writeHead(200, "OK", { "Content-Type": "text/plain" });
//       res.end();
//     });
//   } else {
//     res.writeHead(200);
//     res.write(html);
//     res.end();
//   }
// });

// Listen on port 3000, IP defaults to localhost
server.listen(PORT, function () {
  console.log(
    "App listening on port " + PORT + "! Go to http://localhost:" + PORT + "/"
  );
});

// FOR HTTPS ONLY
// https.createServer({
//   key: fs.readFileSync(process.env.SSLKEY),
//   cert: fs.readFileSync(process.env.SSLCERT),
// }, app)
//     .listen(PORT, function() {
//       console.log('App listening on port ' + PORT + '! Go to https://localhost:' + PORT + '/');
//     });
// app.use(requireHTTPS); FOR HTTPS
// app.enable('trust proxy');
// app.use(function(req, res, next) {
//   if (req.secure) {
//     return next();
//   }
//   res.redirect('https://' + req.headers.host + req.url);
// });

/**
 * @param {int} req req.
 * @param {int} res res.
 * @param {int} next next.
 * @return {void} none.
 */
// function requireHTTPS(req, res, next) {
//   if (!req.secure) {
//     return res.redirect("https://" + req.get("host") + req.url);
//   }
//   next();
// }
