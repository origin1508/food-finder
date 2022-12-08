import axios from 'axios';

const { OPEN_API_ACECCES_KEY } = import.meta.env;

const customAxios2 = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID dODTymLD9we2oNimNEkQ8AfLx5Ho-YJFlYPV-6k87O0`,
  },
});

export default customAxios2;
