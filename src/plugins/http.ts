import { BASE_URL } from '@/constants/urls';
import axios from 'axios';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
