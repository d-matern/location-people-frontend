import axios from 'axios';
import { backendBaseHttpDevUrl, backendBaseHttpProdUrl } from '../config';

const axiosClient = axios.create({
  baseURL: import.meta.env.PROD ? backendBaseHttpProdUrl : backendBaseHttpDevUrl,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosClient;
