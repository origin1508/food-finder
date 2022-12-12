import recipeModel from "../db/model/recipe.model";
import ApiError from "../utils/ApiError";
import constant from "../constants/constant";

export default {
  async findAllRecipeInformations({ method, category, lastRecipeId, limit }) {
    const postsPerPage = limit ? limit : constant.postsPerPage;
    const verifiedLastRecipeId =
      lastRecipeId === "init" ? undefined : lastRecipeId;

    const recipes = await recipeModel.findAll({
      lastRecipeId: verifiedLastRecipeId,
      method,
      category,
      postsPerPage: +postsPerPage + 1,
    });

    let recipesObject;
    if (recipes.length > postsPerPage) {
      recipesObject = {
        recipes: recipes.slice(undefined, postsPerPage),
        isLast: false,
        lastRecipeId: recipes[recipes.length - 2]?.dishId,
      };
    } else {
      recipesObject = {
        recipes: recipes,
        isLast: true,
        lastRecipeId: recipes[recipes.length - 1]?.dishId,
      };
    }

    return recipesObject;
  },
  async findRecipeDetail({ dishId, userId }) {
    const recipe = await recipeModel.findRecipeDetailByDishId({ dishId });

    if (recipe.length === 0) {
      throw ApiError.setNotFound("존재하지 않는 레시피입니다.");
    }

    const recipeObject = { ...recipe[0].dataValues };

    const { views } = recipeObject;
    const increasedViews = views + 1;
    await recipeModel.updateRecipeInformation({
      views: increasedViews,
      dishId,
    });

    recipeObject.liked = await recipeModel.findExistenceOfLike({
      userId,
      dishId,
    });

    const stars = recipeObject.RecipeStars.map((data) => {
      if (data.dataValues.userId === userId) {
        recipeObject.myStar = data.dataValues.score;
      }

      return data.dataValues.score;
    });

    const starAverage = Math.ceil(
      stars.reduce((acc, cur, idx) => (acc += cur), 0) / stars.length
    );

    recipeObject.starAverage = starAverage ? starAverage : 0;
    delete recipeObject.RecipeStars;

    recipeObject.views = increasedViews;
    recipeObject.RecipeLikes = recipeObject.RecipeLikes.length;

    recipeObject.writer = recipeObject.User;
    delete recipeObject.User;

    return recipeObject;
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
    // TODO: transaction
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
    let stepImagesIndex = 0;

    // FIXME: bulk insert 고려
    for (let stepObject of parsedSteps) {
      const createdStep = await recipeModel.createStep({
        content: stepObject.content,
        imageUrl: stepImages[stepImagesIndex].location,
        step: stepObject.step,
        dishId: createdRecipeInformation.dish_id,
      });

      createdSteps.push(createdStep);
      stepImagesIndex += 1;
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

    const existenceOfStar = await recipeModel.findExistenceOfStar({
      userId,
      dishId,
    });

    if (existenceOfStar) {
      throw ApiError.setBadRequest("이미 별점을 준 상태입니다.");
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
    // FIXME: 업데이트 로직 고려
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
