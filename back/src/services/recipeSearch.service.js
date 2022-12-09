import ApiError from "../utils/ApiError";
import RecipeModel from "../db/model/recipe.model";

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

export default {
  async searchRecipe(searchKeyword) {
    const searchedRecipe = await RecipeModel.findByKeyword(searchKeyword);

    return searchedRecipe;
  },

  async recipeRankingOn7days() {
    const recipeRanking = await RecipeModel.rankingOn7days();
    if (!recipeRanking) {
      throw ApiError.setBadRequest("이번 주 레시피 불러오기 실패");
    }

    return recipeRanking;
  },

  async getRandomRecipe() {
    const concatenatedDishId = await RecipeModel.getConcatenatedDishId();
    if (!concatenatedDishId) {
      throw ApiError.setBadRequest("랜덤 레시피 불러오기 실패");
    }

    const arrayOfDishId = concatenatedDishId.split(",");
    const randomDishId = getMultipleRandom(
      arrayOfDishId,
      arrayOfDishId.length >= 10 ? 10 : arrayOfDishId.length
    );

    const randomRecipe = await RecipeModel.getRandomRecipe(randomDishId);
    if (!randomRecipe) {
      throw ApiError.setBadRequest("랜덤 레시피 불러오기 실패");
    }

    return randomRecipe;
  },
};
