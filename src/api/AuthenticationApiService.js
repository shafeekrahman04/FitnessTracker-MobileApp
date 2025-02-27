import {loginApiClient} from './ApiClient';

export const userLogin = async (username, password) =>
  await loginApiClient.post('/login', {username: username, password: password});

export const userRegister = async (data) =>
  await loginApiClient.post('/register', data);
