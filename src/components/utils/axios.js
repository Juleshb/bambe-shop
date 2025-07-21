import axios from "axios";

const URL = "https://bambe.shop";
const axiosInstance = axios.create({
    baseURL: `${URL}`,
  });
  
  
  axiosInstance.interceptors.request.use(
    (config) => {
      // Check for both admin token and client token
      const adminToken = localStorage.getItem("token");
      const clientToken = localStorage.getItem("clientToken");
      const token = adminToken || clientToken;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // DO NOT set Content-Type for FormData; let Axios handle it
      if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  export default axiosInstance