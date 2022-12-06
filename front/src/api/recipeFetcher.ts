import customAxios from '../util/customAxios';
import Storage from '../storage/storage';

const JWT_TOKEN = Storage.getToken();

export const createRecipeRequest = async (recipeForm) => {
  const formData = new FormData();
  const {
    name,
    method,
    category,
    ingredient,
    serving,
    cookingTime,
    recipeThumnail,
    stepImages,
    steps,
  } = recipeForm;

  formData.append('name', name);
  formData.append('method', method);
  formData.append('category', category);
  formData.append('ingredient', ingredient);
  formData.append('serving', serving);
  formData.append('cookingTime', cookingTime);
  formData.append('recipeThumnail', recipeThumnail);
  stepImages.forEach((stepImage) => {
    formData.append('stepImages', stepImage);
  });
  formData.append('steps', steps);

  const res = await customAxios.post('/test/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });

  return res.data;
};
