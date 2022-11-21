import axios from 'axios';

const customAxios = axios.create({
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
    throw new Error('Response Error');
  },
);

export default customAxios;
