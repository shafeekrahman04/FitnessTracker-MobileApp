import { apiClient } from "./ApiClient";

export const getEmergencyContacts = async (id) =>
  await apiClient.get(`/emergency-contact/${id}`);

