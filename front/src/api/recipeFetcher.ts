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

export async function getRandomRecipes() {
  const res = await customAxios.get(`/recipe/list/random`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return res.data.result;
}

export async function getRecipeRanking() {
  const res = await customAxios.get(`/recipe/list/week`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return res.data.result;
}

export async function getRecipeDetail(userId: string) {
  const res = await customAxios.get(`/test/recipes/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return res.data.result;
}
