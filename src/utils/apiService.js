import axios from 'axios';
import Config from 'react-native-config';

export const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
});
