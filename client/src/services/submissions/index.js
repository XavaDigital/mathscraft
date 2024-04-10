import axios from "axios";
import config from "../../config";

const instance = axios.create({
  baseURL: config.WS_BASE_URL,
});

// const sheets = axios.create({});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  config.headers.ContentType = "application/json";
  return config;
});

export const indexSubmissions = () => {
  return instance
    .get("submissions/")
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSubmission = (id) => {
  return instance
    .get(`submissions/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSubmission = (values) => {
  return instance
    .post(`submissions/`, { values })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const downloadSubmissions = () => {
  return instance
    .get(`submissions/download`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendMessage = (values) => {
  return instance
    .post(`submissions/message`, { values })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
