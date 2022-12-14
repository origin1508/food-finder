import { body, param, query } from "express-validator";
import validate from "./commonValidator";
import constant from "../constants/constant";
import ApiError from "../utils/ApiError";

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
          if (!constant.categories.includes(category)) {
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
        .isIn(constant.categories)
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
};
