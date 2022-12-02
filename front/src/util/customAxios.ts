import axios from 'axios';

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

export default customAxios;
