import axios from 'axios';
import {SetupInterceptors} from './SetupInterceptors';

let apiClient = axios.create({
  baseURL: 'http://192.168.29.138:8082/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
let loginApiClient = axios.create({
  baseURL: 'http://192.168.29.138:8082/authenticate',
  headers: {
    'Content-Type': 'application/json',
  },
});

SetupInterceptors(apiClient);

export { apiClient,loginApiClient, SetupInterceptors };
