import axios from 'axios';
import {SetupInterceptors} from './SetupInterceptors';

let apiClient = axios.create({
  baseURL: 'http://84.247.187.199:8080/fitness/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
let loginApiClient = axios.create({
  baseURL: 'http://84.247.187.199:8080/fitness/authenticate',
  headers: {
    'Content-Type': 'application/json',
  },
});

SetupInterceptors(apiClient);

export { apiClient,loginApiClient, SetupInterceptors };
