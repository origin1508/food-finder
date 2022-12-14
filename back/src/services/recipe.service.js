import recipeModel from "../db/model/recipe.model";
import ApiError from "../utils/ApiError";
import constant from "../constants/constant";

export default {
  async findAllRecipeInformations({ method, category, lastRecipeId, limit }) {
    // TODO: category '국&찌개' 처리
    const postsPerPage = limit ? limit : constant.postsPerPage;
    const verifiedLastRecipeId =
      lastRecipeId === "init" ? undefined : lastRecipeId;

    const recipes = await recipeModel.findAll({
      lastRecipeId: verifiedLastRecipeId,
      method,
      category,
      postsPerPage: +postsPerPage + 1,
    });

    const refinedRecipes = recipes.map((recipe) => {
      const {
        dishId,
        name,
        method,
        category,
        smallThumbnailUrl,
        largeThumbnailUrl,
        views,
        likes,
        nickname,
        userId,
        profileUrl,
      } = recipe;
      return {
        dishId,
        name,
        method,
        category,
        smallThumbnailUrl,
        largeThumbnailUrl,
        views,
        likes,
        writer: {
          userId,
          nickname,
          profileUrl,
        },
      };
    });

    let recipesObject;
    if (recipes.length > postsPerPage) {
      recipesObject = {
        recipes: refinedRecipes.slice(undefined, postsPerPage),
        isLast: false,
        lastRecipeId: refinedRecipes[refinedRecipes.length - 2]?.dishId,
      };
    } else {
      recipesObject = {
        recipes: refinedRecipes,
        isLast: true,
        lastRecipeId: refinedRecipes[refinedRecipes.length - 1]?.dishId,
      };
    }

    return recipesObject;
  },
  async findRecipeDetail({ dishId, userId }) {
    const recipe = await recipeModel.findRecipeDetailByDishId({ dishId });

    if (recipe.length === 0) {
      throw ApiError.setNotFound(
        constant.nonexistentValueErrorMessage("recipeId")
      );
    }

    const recipeObject = { ...recipe[0].dataValues };

    // FIXME: 조회 수 증가 따로 빼기
    const { views } = recipeObject;
    const increasedViews = views + 1;
    await recipeModel.updateRecipeInformation({
      views: increasedViews,
      dishId,
    });

    recipeObject.liked = false;
    recipeObject.RecipeLikes.every((element) => {
      if (element.dataValues.userId === userId) {
        recipeObject.liked = true;
        return false;
      }
      return true;
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
    recipeObject.numberOfStar = stars.length;
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

    const listForCreate = [];
    let stepImagesIndex = 0;

    for (let stepObject of parsedSteps) {
      listForCreate.push({
        content: stepObject.content,
        image_url: stepImages[stepImagesIndex].location,
        step: stepObject.step,
        dish_id: createdRecipeInformation.dish_id,
      });

      stepImagesIndex += 1;
    }

    const createdSteps = await recipeModel.createStepUsingBulk(listForCreate);

    return {
      recipeInformation: { ...createdRecipeInformation.dataValues },
      steps: createdSteps,
    };
  },
  async addComment({ userId, content, dishId }) {
    const createdComment = await recipeModel
      .createRecipeComment({
        userId,
        content,
        dishId,
      })
      .catch((error) => {
        throw ApiError.setNotFound(
          constant.nonexistentValueErrorMessage("recipeId")
        );
      });

    return createdComment;
  },
  async addLike({ userId, dishId }) {
    const createdLike = await recipeModel
      .createRecipeLike({ userId, dishId })
      .catch((error) => {
        if (error.name === "SequelizeForeignKeyConstraintError") {
          throw ApiError.setNotFound(
            constant.nonexistentValueErrorMessage("recipeId")
          );
        } else if (error.name === "SequelizeUniqueConstraintError") {
          throw ApiError.setConflict(
            constant.conflictValueErrorMessage("like")
          );
        } else {
          throw ApiError.setInternalServerError("serverError");
        }
      });

    return createdLike;
  },
  async addStar({ userId, dishId, score }) {
    const createdStar = await recipeModel
      .createRecipeStar({
        userId,
        dishId,
        score,
      })
      .catch((error) => {
        if (error.name === "SequelizeForeignKeyConstraintError") {
          throw ApiError.setNotFound(
            constant.nonexistentValueErrorMessage("recipeId")
          );
        } else if (error.name === "SequelizeUniqueConstraintError") {
          throw ApiError.setConflict(
            constant.conflictValueErrorMessage("star")
          );
        } else {
          throw ApiError.setInternalServerError("serverError");
        }
      });

    return createdStar;
  },
  async updateRecipe({
    name,
    method,
    category,
    ingredient,
    serving,
    cookingTime,
    userId,
    dishId,
    thumbnailUrl,
    stepImages,
    steps,
  }) {
    let parsedSteps;
    if (steps) {
      parsedSteps = JSON.parse(steps);
    }

    const updatedRecipeInformation = await recipeModel
      .updateRecipeInformation({
        dishId,
        name,
        method,
        category,
        imageUrl1: thumbnailUrl,
        imageUrl2: thumbnailUrl,
        ingredient,
        serving,
        cookingTime,
        userId,
      })
      .then((result) => {
        if (result[0] === 0) {
          const error = new Error();
          error.name = "NotUpdated";

          throw error;
        }
      })
      .catch((error) => {
        if (error.name === "NotUpdated") {
          throw ApiError.setUnauthorized(
            constant.unauthorizedErrorMessage("recipeId")
          );
        } else {
          throw ApiError.setInternalServerError("serverError");
        }
      });

    if (steps) {
      const deletedSteps = await recipeModel.deleteStepsByDishId({ dishId });

      let stepImagesIndex = 0;
      const listForCreate = [];

      for (let stepObject of parsedSteps) {
        let imageUrl;

        if (stepObject.imageUrl) {
          imageUrl = stepObject.imageUrl;
        } else {
          imageUrl = stepImages[stepImagesIndex].location;
          stepImagesIndex += 1;
        }

        listForCreate.push({
          content: stepObject.content,
          image_url: imageUrl,
          step: stepObject.step,
          dish_id: dishId,
        });
      }

      const createdSteps = await recipeModel.createStepUsingBulk(listForCreate);
    }

    return updatedRecipeInformation;
  },
  async updateComment({ userId, commentId, content }) {
    // TODO: 불필요한 DB콜 제거
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
    // TODO: 불필요한 DB콜 제거
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
    // TODO: 불필요한 DB콜 제거
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
    // TODO: 불필요한 DB콜 제거
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
