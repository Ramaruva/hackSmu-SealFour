import axios from "axios";
import { getLocalItem } from "../localStorage";

const baseURL = "http://localhost:5000/api"; // Your backend base URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a request interceptor to add the token to the headers if it exists in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function getRequest(URL) {
  return axiosInstance.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosInstance.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosInstance.patch(`/${URL}`, payload).then((response) => response);
}
export function putRequest(URL, payload) {
  return axiosInstance.put(`/${URL}`, payload).then((response) => response);
}
export function deleteRequest(URL, payload) {
  return axiosInstance
    .delete(`/${URL}`, {}, payload)
    .then((response) => response);
}

export default axiosInstance;
