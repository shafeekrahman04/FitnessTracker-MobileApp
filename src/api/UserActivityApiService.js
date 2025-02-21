import {apiClient} from './ApiClient';

export const saveUserActivity = async data =>
  await apiClient.post('/user-activity', data);

export const getUserActivity = async userId =>
  await apiClient.get(`/user-activity/${userId}`);

export const updateUserActivityStatus = async id =>
  await apiClient.put(`/user-activity/${id}`);
