import customAxios from '../util/customAxios';
import Storage from '../storage/storage';

const JWT_TOKEN = Storage.getToken();

export const createRecipeRequest = async (formData: FormData) => {
  const res = await customAxios.post('/recipes', formData, {
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
  const res = await customAxios.get(`/recipes/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return res.data.result;
}

export async function recipeCommentRequest({
  recipeId,
  comment,
}: {
  recipeId: string;
  comment: string;
}) {
  const res = await customAxios.post(
    `/recipes/${recipeId}/comments`,
    { content: comment },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    },
  );
  return res.data;
}

export async function recipeCommentUpdate({
  recipeId,
  comment,
}: {
  recipeId: string;
  comment: string;
}) {
  const res = await customAxios.patch(
    `/recipes/comments/${recipeId}`,
    { content: comment },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    },
  );
  return res.data;
}

export async function recipeCommentDelete({ recipeId }: { recipeId: string }) {
  const res = await customAxios.delete(`/recipes/comments/${recipeId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return res.data;
}

export async function recipeRequestRating({
  recipeId,
  score,
}: {
  recipeId: string;
  score: number;
}) {
  const res = await customAxios.post(
    `/recipes/${recipeId}/stars`,
    { score },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    },
  );
  return res.data;
}
