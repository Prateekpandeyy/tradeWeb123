import axios from "axios";
const BaseUrl = "https://secmark-ms-tradewebapi.azurewebsites.net/api"
const BACKEND_URL = BaseUrl;
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  // timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {

    const auth = localStorage.getItem("token");
    if (auth) {
      config.headers = {
        Authorization: "Bearer " + auth,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default axiosInstance;
