import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getAuthRecipes, getAuthLikeRecipes } from '../../api/authFetcher';
import { authState } from '../../atom/auth';

interface AuthRecipe {
  dishId: number;
  name: string;
  smallThumbnailUrl: string;
  largeThumbnailUrl: string;
  views: number;
  likes: number;
}

function useAuthRecipes(userId: number) {
  return useQuery<AuthRecipe[], Error>(['authRecips'], () =>
    getAuthRecipes(userId),
  );
}

function useAuthLikeRecipes() {
  return useQuery<AuthRecipe[], Error>(['authLikeRecips'], getAuthLikeRecipes);
}

export { useAuthRecipes, useAuthLikeRecipes };
