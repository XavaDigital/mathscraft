const dev = {
  WS_BASE_URL: "http://localhost:5100/api/",
  // DOMAIN_NAME: "http://localhost:3000",
  // DEMO: false,
};

const prod = {
  // Same-origin: Firebase Hosting rewrites /api/** to the Cloud Run service
  WS_BASE_URL: "/api/",
  // DEMO: false,
};

const config = prod;

// console.log(config);

export default config;
