import { useQuery } from 'react-query';
import { getAuthRecipes, getAuthLikeRecipes } from '../../api/authFetcher';

interface AuthRecipe {
  dishId: number;
  name: string;
  smallThumbnailUrl: string;
  largeThumbnailUrl: string;
  views: number;
  likes: number;
}

function useAuthRecipes() {
  return useQuery<AuthRecipe[], Error>(['authRecips'], getAuthRecipes);
}

function useAuthLikeRecipes() {
  return useQuery<AuthRecipe[], Error>(['authLikeRecips'], getAuthLikeRecipes);
}

export { useAuthRecipes, useAuthLikeRecipes };
