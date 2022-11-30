import ApiError from "../utils/ApiError";
import RecipeModel from "../db/model/recipe.model";

export default {
  async searchRecipe(searchKeyword) {
    const searchedRecipe = await RecipeModel.findByKeyword(searchKeyword);

    return searchedRecipe;
  },

  async recipeRankingOn7days() {
    const recipeRanking = await RecipeModel.rankingOn7days();

    return recipeRanking;
  },
};
