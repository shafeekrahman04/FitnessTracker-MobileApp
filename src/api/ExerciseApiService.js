import {apiClient} from './ApiClient';

export const getExerciseData = async () => await apiClient.get('/exercise');
