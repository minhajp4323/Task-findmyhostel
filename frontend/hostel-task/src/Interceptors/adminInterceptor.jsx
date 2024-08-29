import axios from "axios";

const adminInstance = axios.create({
  baseURL:
    import.meta.env.VITE_APP_BASE_URL || import.meta.env.VITE_APP_BASE_URL_2,
});

adminInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminInstance;
