import customAxios from '../util/customAxios';
import Storage from '../storage/storage';

const JWT_TOKEN = Storage.getToken();

export const createRecipeRequest = async (formData: FormData) => {
  const res = await customAxios.post('/test/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });

  return res.data;
};

export const searchKeywordRequest = async (keyword: string) => {
  const res = await customAxios.get(`/recipe/${keyword}`);

  return res.data;
};
