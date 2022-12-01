import recipeModel from "../db/model/recipe.model";
import ApiError from "../utils/ApiError";

export default {
  async findAllRecipeInformations() {
    const recipes = await recipeModel.findAll();

    return recipes;
  },

  async addRecipe({
    name,
    method,
    category,
    ingredient,
    serving,
    cookingTime,
    userId,
    thumbnailUrl,
  }) {
    const createdRecipeInformation = await recipeModel.createRecipeInformation({
      name,
      method,
      category,
      imageUrl1: thumbnailUrl, // 테스트용
      imageUrl2: thumbnailUrl, // 테스트용
      ingredient,
      serving,
      cookingTime,
      userId,
    });

    return createdRecipeInformation;
  },
};
