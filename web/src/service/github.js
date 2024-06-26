import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_URL,
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

export default axiosPrivate;
