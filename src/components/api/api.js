import axios from "axios";

let url = "http://127.0.0.1:8000/";

const api = new axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
