// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://libcheckbackend-2.onrender.com', // or your local IP
  timeout: 10000, // optional: request timeout
});

export default instance;
