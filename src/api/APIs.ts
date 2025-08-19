import axios from 'axios';
import { appConfig } from '../config/appConfig';

export const API = axios.create({
  baseURL: appConfig.baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
