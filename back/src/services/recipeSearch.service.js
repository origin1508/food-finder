import ApiError from "../utils/ApiError";
import RecipeModel from "../db/model/recipe.model";

export default {
  async searchRecipe(searchKeyword) {
    const searchedRecipe = await RecipeModel.findByKeyword(searchKeyword);

    return searchedRecipe;
  },
};
