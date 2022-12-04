import axios from 'axios';
import { AxiosError } from 'axios';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';

const { VITE_SERVER_URL } = import.meta.env;

const customAxios = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: {
    'Content-Type': 'Aplication/json',
  },
  timeout: 3000,
});

customAxios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    throw new Error('Requset Error');
  },
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      const { statusText, data } = error.response;
      if (
        statusText === 'Unauthorized' &&
        data.message === '유효기간이 만료된 토큰입니다.'
      ) {
        Storage.clearToken();
        CookieStorage.clearToken();
        window.location.replace('/login');
      }
      return Promise.reject(error);
    } else if (error.response.status >= 500) {
      return AxiosError;
    }
  },
);

export default customAxios;
