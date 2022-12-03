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
    stepImages,
    steps,
  }) {
    const parsedSteps = JSON.parse(steps);

    const createdRecipeInformation = await recipeModel.createRecipeInformation({
      name,
      method,
      category,
      imageUrl1: thumbnailUrl,
      imageUrl2: thumbnailUrl,
      ingredient,
      serving,
      cookingTime,
      userId,
    });

    const createdSteps = [];

    for (let key in parsedSteps) {
      const createdStep = await recipeModel.createStep({
        content: parsedSteps[key],
        imageUrl: stepImages[Number(key) - 1].location,
        step: Number(key),
        dishId: createdRecipeInformation.dish_id,
      });

      createdSteps.push(createdStep);
    }

    return {
      recipeInformation: { ...createdRecipeInformation.dataValues },
      steps: createdSteps,
    };
  },
};
