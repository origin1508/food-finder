import ApiError from "../utils/ApiError";
import RecipeModel from "../db/model/recipe.model";

export default {
  async searchRecipe(searchKeyword) {
    const searchedRecipe = await RecipeModel.findByKeyword(searchKeyword);

    return searchedRecipe;
  },

  async recipeRankingOn7days() {
    const recipeRanking = await RecipeModel.rankingOn7days();
    if (!recipeRanking) {
      throw ApiError.setInternalServerError("이번 주 레시피 불러오기 실패");
    }

    return recipeRanking;
  },

  async getRandomRecipe() {
    const randomRecipe = await RecipeModel.getRandomRecipe();
    if (!randomRecipe) {
      throw ApiError.setInternalServerError("랜덤 레시피 불러오기 실패");
    }

    return randomRecipe;
  },
};
