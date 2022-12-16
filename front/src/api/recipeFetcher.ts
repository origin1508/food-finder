import customAxios from '../util/customAxios';
import Storage from '../storage/storage';

export const createRecipeRequest = async (formData: FormData) => {
  const res = await customAxios.post('/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Storage.getToken()}`,
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

export async function getRecipeDetail(userId: string) {
  const res = await customAxios.get(`/recipes/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
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
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    },
  );
  return res.data;
}

export async function recipeCommentUpdate({
  commentId,
  comment,
}: {
  commentId: number;
  comment: string;
}) {
  const res = await customAxios.patch(
    `/recipes/comments/${commentId}`,
    { content: comment },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    },
  );
  return res.data;
}

export async function recipeCommentDelete({
  commentId,
}: {
  commentId: number;
}) {
  const res = await customAxios.delete(`/recipes/comments/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getToken()}`,
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
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    },
  );
  return res.data;
}

export async function recipeRequestUpdate({
  recipeId,
  score,
}: {
  recipeId: string;
  score: number;
}) {
  const res = await customAxios.put(
    `/recipes/${recipeId}/stars`,
    { score },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getToken()}`,
      },
    },
  );
  return res.data;
}

export const recipeDeleteRequest = async (recipeId: number) => {
  const res = await customAxios.delete(`/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });

  return res.data;
};

export const recipeUpdateRequest = async (
  recipeId: string,
  formData: FormData,
) => {
  const res = await customAxios.patch(`/recipes/${recipeId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });

  return res.data;
};

export async function getRecipesCardInfo({
  pageParams,
  method,
  category,
}: {
  pageParams: number;
  method: string;
  category: string;
}) {
  if (category === '국&찌개') {
    category = '국찌개';
  }

  const { data } = await customAxios.get(
    `/recipes?method=${method}&category=${category}&lastRecipeId=${pageParams}&limit=12`,
  );
  const { recipes, isLast, lastRecipeId } = data.result;
  return { recipes, nextPage: lastRecipeId, isLast };
}
