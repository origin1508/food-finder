import { useQuery } from 'react-query';
import { getRandomRecipes, getRecipeRanking } from '../../api/recipeFetcher';

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
  return useQuery<RandomRecipes[], Error>(['RacipeRanking'], getRecipeRanking);
}
export { useRandomRecipes, useRecipeRanking };
