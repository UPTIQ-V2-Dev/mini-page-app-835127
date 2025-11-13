import { apiClient } from '../lib/api';
import { ContactFormData, ContactResponse } from '../types/app';
import { MOCK_CONTACT_RESPONSE } from '../data/mockData';

export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_CONTACT_RESPONSE;
  }

  const response = await apiClient.post<ContactResponse>('/contact', data);
  return response.data;
};