import recipeModel from "../db/model/recipe.model";
import ApiError from "../utils/ApiError";

export default {
  async findAllRecipeInformations() {
    const recipes = await recipeModel.findAll();

    return recipes;
  },
  async findRecipeDetail({ dishId, userId }) {
    const recipe = await recipeModel.findRecipeDetailByDishId({ dishId });
    if (recipe.length === 0) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    const { views } = recipe[0].dataValues;
    const increasedViews = views + 1;
    await recipeModel.updateRecipeInformation({
      views: increasedViews,
      dishId,
    });

    const existenceOfLike = await recipeModel.findExistenceOfLike({
      userId,
      dishId,
    });
    if (existenceOfLike == true) {
      recipe[0].dataValues.liked = true;
    } else {
      recipe[0].dataValues.liked = false;
    }

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
  async addStep({ userId, dishId, content, imageUrl, step }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    if (recipeInformation.dataValues.userId !== userId) {
      throw ApiError.setUnauthorized("스텝 추가 권한이 없습니다.");
    }

    const createdStep = await recipeModel.createStep({
      content,
      imageUrl,
      step,
      dishId,
    });

    return createdStep;
  },
  async addComment({ userId, content, dishId }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    const createdComment = await recipeModel.createRecipeComment({
      userId,
      content,
      dishId,
    });

    return createdComment;
  },
  async addLike({ userId, dishId }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    const existenceOfLike = await recipeModel.findExistenceOfLike({
      userId,
      dishId,
    });

    if (existenceOfLike == true) {
      throw ApiError.setBadRequest("이미 좋아요를 한 상태입니다.");
    }

    const createdLike = await recipeModel.createRecipeLike({ userId, dishId });

    return createdLike;
  },
  async addStar({ userId, dishId, score }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    const createdStar = await recipeModel.createRecipeStar({
      userId,
      dishId,
      score,
    });

    return createdStar;
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
  async updateStep({ dishId, userId, stepId, content, imageUrl }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    if (recipeInformation.dataValues.userId !== userId) {
      throw ApiError.setUnauthorized("수정 권한이 없습니다.");
    }

    const updatedStep = await recipeModel.updateStep({
      stepId,
      content,
      imageUrl,
    });

    return updatedStep;
  },
  async updateComment({ userId, commentId, content }) {
    const comment = await recipeModel.findRecipeCommentByCommentId({
      commentId,
    });

    if (comment == null) {
      throw ApiError.setNotFound("존재하지 않는 댓글입니다.");
    }

    if (comment.dataValues.userId !== userId) {
      throw ApiError.setUnauthorized("수정 권한이 없습니다.");
    }

    const updatedComment = await recipeModel.updateRecipeComment({
      commentId,
      content,
    });

    return updatedComment;
  },
  async deleteRecipe({ userId, dishId }) {
    const recipeInformation = await recipeModel.findRecipeInformationByDishId({
      dishId,
    });

    if (recipeInformation == null) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    if (recipeInformation.dataValues.userId !== userId) {
      throw ApiError.setUnauthorized("삭제 권한이 없습니다.");
    }

    const deletedRecipe = await recipeModel.deleteRecipeInformation({ dishId });

    return deletedRecipe;
  },
  async deleteComment({ userId, commentId }) {
    const comment = await recipeModel.findRecipeCommentByCommentId({
      commentId,
    });

    if (comment == null) {
      throw ApiError.setNotFound("존재하지 않는 댓글입니다.");
    }

    if (comment.dataValues.userId !== userId) {
      throw ApiError.setUnauthorized("삭제 권한이 없습니다.");
    }

    const deletedComment = await recipeModel.deleteComment({ commentId });

    return deletedComment;
  },
  async deleteLike({ userId, dishId }) {
    const existenceOfLike = await recipeModel.findExistenceOfLike({
      userId,
      dishId,
    });

    if (existenceOfLike == false) {
      throw ApiError.setBadRequest("좋아요 상태가 아닙니다.");
    }

    const deletedLike = await recipeModel.deleteLike({ userId, dishId });

    return deletedLike;
  },
};
