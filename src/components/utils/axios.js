import axios from "axios";

const URL = "http://localhost:4800";
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
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  export default axiosInstance