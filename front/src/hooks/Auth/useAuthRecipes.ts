import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getAuthRecipes, getAuthLikeRecipes } from '../../api/authFetcher';
import { authState } from '../../atom/auth';

export interface AuthRecipe {
  dish_id: number;
  category?: string;
  name: string;
  image_url2: string;
  views: number;
  likes: number;
}

function useAuthRecipes(userId: number) {
  return useQuery<AuthRecipe[], Error>(['authRecips', userId], () =>
    getAuthRecipes(userId),
  );
}

function useAuthLikeRecipes(userId: number) {
  return useQuery<AuthRecipe[], Error>(['authLikeRecips', userId], () =>
    getAuthLikeRecipes(userId),
  );
}

export { useAuthRecipes, useAuthLikeRecipes };
