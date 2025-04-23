// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:5000', // or your local IP
  timeout: 10000, // optional: request timeout
});

export default instance;
