import type { ApiResponse } from '../types/api';
import type { ChoiceDto } from '../types/dto';
import { apiCall } from '../utils/apiClient';
import { API } from './APIs';

export const getChoices = async (): Promise<ApiResponse<ChoiceDto[]>> =>
  apiCall(() => API.get('/api/choices'));

export const getRandomlyGeneratedChoice = async (): Promise<
  ApiResponse<ChoiceDto>
> => apiCall(() => API.get('/api/choice'));
