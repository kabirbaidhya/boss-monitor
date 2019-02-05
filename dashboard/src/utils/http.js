import axios from 'axios';
import config from '../config';

const http = axios.create({
  baseURL: config.api.baseUrl,
  headers: {}
});

export default http;
