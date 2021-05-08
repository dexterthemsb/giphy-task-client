import axios from "axios";
import { baseURL } from "../constants/apis";

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") }
});

export default axiosInstance;
