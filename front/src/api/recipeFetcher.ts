import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';

export async function getRandomRecipes() {
  const res = await customAxios.get(`/recipe/list/random`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data.result;
}

export async function getRecipeRanking() {
  const res = await customAxios.get(`/recipe/list/week`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data.result;
}
