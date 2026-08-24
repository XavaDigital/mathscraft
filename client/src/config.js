const dev = {
  WS_BASE_URL: "http://localhost:5100/api/",
  // DOMAIN_NAME: "http://localhost:3000",
  // DEMO: false,
};

const prod = {
  // Default is same-origin: Firebase Hosting rewrites /api/** to the Cloud Run
  // service. The S3/CloudFront copy at box.mathscraftnz.org is built with
  // REACT_APP_WS_BASE_URL set to the Cloud Run URL (see DEPLOYMENT.md).
  WS_BASE_URL: process.env.REACT_APP_WS_BASE_URL || "/api/",
  // DEMO: false,
};

const config = prod;

// console.log(config);

export default config;
