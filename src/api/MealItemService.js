import {apiClient} from './ApiClient';

export const getMealItemData = async () => await apiClient.get('/meal-item');
