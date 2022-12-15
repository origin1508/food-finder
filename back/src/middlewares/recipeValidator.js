import { body, param, query } from "express-validator";
import validate from "./commonValidator";
import constant from "../constants/constant";
import ApiError from "../utils/ApiError";
import utils from "../utils/utils";

export default {
  getRecipeInformationsValidator() {
    return [
      query().custom((value, { req }) => {
        const { method, category, lastRecipeId, limit } = req.query;
        if (method && !constant.methods.includes(method)) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("method")
          );
        }

        if (category) {
          if (!constant.categoriesForParam.includes(category)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("category")
            );
          } else {
            req.query.category = category === "국찌개" ? "국&찌개" : category;
          }
        }

        if (lastRecipeId && isNaN(lastRecipeId)) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("lastRecipeId")
          );
        }

        if (limit && isNaN(limit)) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("limit")
          );
        }

        return true;
      }),
      validate,
    ];
  },
  getRecipeDetailValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId"))
        .toInt(),
      validate,
    ];
  },
  addRecipeValidator() {
    return [
      body("name")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("name"))
        .bail(),
      body("method")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("method"))
        .isIn(constant.methods)
        .withMessage(constant.invalidValueErrorMessage("method"))
        .bail(),
      body("category")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("category"))
        .isIn(constant.categoriesForBody)
        .withMessage(constant.invalidValueErrorMessage("category"))
        .bail(),
      body("serving")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("serving"))
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("serving"))
        .toInt()
        .bail(),
      body("cookingTime")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("cookingTime"))
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("cookingTime"))
        .toInt()
        .bail(),
      body("ingredient")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("ingredient"))
        .isJSON()
        .withMessage(constant.invalidValueErrorMessage("ingredient"))
        .custom((value, { req }) => {
          const parsedIngredient = JSON.parse(value);

          if (!Array.isArray(parsedIngredient)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("ingredient")
            );
          }

          parsedIngredient.forEach((value) => {
            if (
              Object.keys(value).toString() !==
              constant.ingredientKeys.toString()
            ) {
              throw ApiError.setBadRequest(
                constant.invalidValueErrorMessage("ingredient")
              );
            }
          });

          return true;
        })
        .bail(),
      body("steps")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("steps"))
        .isJSON()
        .withMessage(constant.invalidValueErrorMessage("steps"))
        .custom((value, { req }) => {
          const parsedStep = JSON.parse(value);

          if (!Array.isArray(parsedStep)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("step")
            );
          }

          if (parsedStep.length !== req.files["stepImages"].length) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("stepImages")
            );
          }

          parsedStep.forEach((value) => {
            if (
              Object.keys(value).toString() !== constant.stepKeys.toString()
            ) {
              throw ApiError.setBadRequest(
                constant.invalidValueErrorMessage("step")
              );
            }
          });

          return true;
        }),
      validate,
    ];
  },
  addRecipeCommentValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId"))
        .toInt(),
      body("content")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("content")),
      validate,
    ];
  },
  addLikeValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId"))
        .toInt(),
      validate,
    ];
  },
  addStarValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId"))
        .toInt(),
      body("score")
        .isInt({ min: 0, max: 5 })
        .withMessage(constant.invalidValueErrorMessage("score"))
        .toInt(),
      validate,
    ];
  },
  updateRecipeValidator() {
    return [
      body().custom((value, { req }) => {
        const { method, category, serving, cookingTime, ingredient, steps } =
          req.body;

        if (serving && !Number.isInteger(Number(serving))) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("serving")
          );
        }

        if (cookingTime && !Number.isInteger(Number(cookingTime))) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("cookingTime")
          );
        }

        if (method && !constant.methods.includes(method)) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("method")
          );
        }

        if (category && !constant.categoriesForBody.includes(category)) {
          throw ApiError.setBadRequest(
            constant.invalidValueErrorMessage("category")
          );
        }

        if (ingredient) {
          if (!utils.isJson(ingredient)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("ingredient")
            );
          }

          const parsedIngredient = JSON.parse(ingredient);

          if (!Array.isArray(parsedIngredient)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("ingredient")
            );
          }

          parsedIngredient.forEach((value) => {
            if (
              Object.keys(value).toString() !==
              constant.ingredientKeys.toString()
            ) {
              throw ApiError.setBadRequest(
                constant.invalidValueErrorMessage("ingredient")
              );
            }
          });
        }

        if (steps) {
          if (!utils.isJson(steps)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("steps")
            );
          }

          const parsedSteps = JSON.parse(steps);

          if (!Array.isArray(parsedSteps)) {
            throw ApiError.setBadRequest(
              constant.invalidValueErrorMessage("step")
            );
          }

          parsedSteps.forEach((value) => {
            if (
              Object.keys(value).toString() !== constant.stepKeys.toString() &&
              Object.keys(value).toString() !==
                constant.stepKeysForUpdate.toString()
            ) {
              throw ApiError.setBadRequest(
                constant.invalidValueErrorMessage("step")
              );
            }
          });
        }

        return true;
      }),
      validate,
    ];
  },
  updateCommentValidator() {
    return [
      param("commentId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("commentId"))
        .bail(),
      body("content")
        .notEmpty()
        .withMessage(constant.invalidValueErrorMessage("content")),
      validate,
    ];
  },
  updateStarValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId"))
        .bail(),
      body("score")
        .isInt({ min: 0, max: 5 })
        .withMessage(constant.invalidValueErrorMessage("score")),
      validate,
    ];
  },
  deleteRecipeValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId")),
      validate,
    ];
  },
  deleteCommentValidator() {
    return [
      param("commentId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("commentId")),
      validate,
    ];
  },
  deleteLikeValidator() {
    return [
      param("recipeId")
        .isInt()
        .withMessage(constant.invalidValueErrorMessage("recipeId")),
      validate,
    ];
  },
};
