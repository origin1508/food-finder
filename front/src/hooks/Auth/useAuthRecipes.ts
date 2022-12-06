import { useQuery } from 'react-query';
import { getAuthRecipes, getAuthLikeRecipes } from '../../api/authFetcher';

interface AuthRecipesValue {
  dishId: number;
  name: string;
  smallThumbnailUrl: string;
  largeThumbnailUrl: string;
  views: number;
  likes: number;
}

function useAuthRecipes() {
  return useQuery<AuthRecipesValue[], Error>(['authRecips'], getAuthRecipes);
}

function useAuthLikeRecipes() {
  return useQuery<AuthRecipesValue[], Error>(
    ['authLikeRecips'],
    getAuthLikeRecipes,
  );
}

export { useAuthRecipes, useAuthLikeRecipes };
