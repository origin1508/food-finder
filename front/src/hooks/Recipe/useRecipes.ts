import { useQuery } from 'react-query';
import {
  getRandomRecipes,
  getRecipeRanking,
  getRecipeDetail,
} from '../../api/recipeFetcher';
import { RecipeDetailInitial } from '../../types/recipe/recipeDetailType';

export interface RandomRecipes {
  dish_id: number;
  name: string;
  image_url1: string;
  image_url2: string;
  views: number;
  likes: number;
  nickname: 'string';
}

function useRandomRecipes() {
  return useQuery<RandomRecipes[], Error>(['randomRecips'], getRandomRecipes);
}

function useRecipeRanking() {
  return useQuery<RandomRecipes[], Error>(['racipeRanking'], getRecipeRanking);
}

function useRecipeDetail(userId: string) {
  return useQuery<RecipeDetailInitial, Error>(['racipeDetail', userId], () =>
    getRecipeDetail(userId),
  );
}
export { useRandomRecipes, useRecipeRanking, useRecipeDetail };
