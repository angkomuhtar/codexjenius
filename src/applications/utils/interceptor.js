import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://contact.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers or configurations you need
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // instance a token here
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default axiosInstance;
