import recipeModel from "../db/model/recipe.model";
import ApiError from "../utils/ApiError";

export default {
  async findAllRecipeInformations() {
    const recipes = await recipeModel.findAll();

    return recipes;
  },
  async findRecipeDetail({ dishId }) {
    const recipe = await recipeModel.findRecipeDetailByDishId({ dishId });
    if (recipe.length === 0) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    const { views } = recipe[0].dataValues;
    const increasedViews = views + 1;
    await recipeModel.updateRecipeViews({ views: increasedViews, dishId });

    recipe[0].dataValues.views = increasedViews;
    recipe[0].dataValues.RecipeLikes = recipe[0].dataValues.RecipeLikes.length;
    recipe[0].dataValues.writer = recipe[0].dataValues.User;
    delete recipe[0].dataValues.User;

    return recipe;
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
  async updateRecipeInformation({
    userId,
    dishId,
    name,
    method,
    category,
    recipeThumbnail,
    ingredient,
    serving,
    cookingTime,
  }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    if (recipeInformation.dataValues.userId !== userId) {
      throw ApiError.setUnauthorized("수정 권한이 없습니다.");
    }

    const updatedRecipeInformation = await recipeModel.updateRecipeInformation({
      dishId,
      name,
      method,
      category,
      imageUrl1: recipeThumbnail,
      imageUrl2: recipeThumbnail,
      ingredient,
      serving,
      cookingTime,
    });

    return updatedRecipeInformation;
  },
};
