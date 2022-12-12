import customAxios from '../util/customAxios';

export const getPrediction = async (formData: FormData) => {
  const res = await customAxios.post('/prediction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
