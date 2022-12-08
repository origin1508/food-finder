import {
  Recipe,
  RecipeLike,
  User,
  RecipeComment,
  RecipeStar,
  Step,
} from "../schema";
import { Op, Sequelize } from "sequelize";

export default {
  async findAll() {
    const recipes = await Recipe.findAll({
      attributes: [
        ["dish_id", "dishId"],
        "name",
        ["image_url1", "smallThumbnailUrl"],
        ["image_url2", "largeThumbnailUrl"],
        "views",
        [
          Sequelize.fn("COUNT", Sequelize.col("`RecipeLikes`.`user_id`")),
          "likes",
        ],
      ],
      include: [
        {
          model: RecipeLike,
          attributes: [],
          required: false,
        },
      ],
      group: ["dish_id"],
    });

    return recipes;
  },
  async findRecipeInformationByDishId({ dishId }) {
    const recipeInformation = await Recipe.findOne({
      attributes: [
        ["dish_id", "dishId"],
        "name",
        "method",
        "category",
        ["image_url1", "smallThumbnailUrl"],
        ["image_url2", "largeThumbnailUrl"],
        "ingredient",
        "serving",
        ["cooking_time", "cookingTime"],
        "views",
        ["user_id", "userId"],
      ],
      where: { dish_id: Number(dishId) },
    });

    return recipeInformation;
  },
  async findRecipeDetailByDishId({ dishId }) {
    const recipeDetail = await Recipe.findAll({
      attributes: [
        ["dish_id", "dishId"],
        "name",
        "method",
        "category",
        ["image_url1", "smallThumbnailUrl"],
        ["image_url2", "largeThumbnailUrl"],
        "ingredient",
        "serving",
        ["cooking_time", "cookingTime"],
        "views",
      ],
      include: [
        {
          model: User,
          attributes: [
            ["user_id", "userId"],
            "email",
            "nickname",
            ["profile_url", "profileUrl"],
          ],
        },
        {
          model: RecipeLike,
          attributes: [["user_id", "userId"]],
          required: false,
        },
        {
          model: Step,
          attributes: [
            ["step_id", "stepId"],
            "content",
            ["image_url", "imageUrl"],
            "step",
          ],
        },
        {
          model: RecipeComment,
          attributes: [["comment_id", "commentId"], "content"],
          include: [
            {
              model: User,
              attributes: [
                ["user_id", "userId"],
                "nickname",
                ["profile_url", "profileUrl"],
                "createdAt",
                "updatedAt",
              ],
            },
          ],
        },
        {
          model: RecipeStar,
          attributes: [["user_id", "userId"], "score"],
        },
      ],
      where: { dish_id: Number(dishId) },
    });

    return recipeDetail;
  },
  async findRecipeCommentByCommentId({ commentId }) {
    const comment = await RecipeComment.findOne({
      attributes: [
        ["comment_id", "commentId"],
        "content",
        ["user_id", "userId"],
        ["dish_Id", "dishId"],
      ],
      where: { comment_Id: Number(commentId) },
    });

    return comment;
  },
  async findExistenceOfLike({ userId, dishId }) {
    const existence = await RecipeLike.findOne({
      where: { user_id: Number(userId), dish_id: Number(dishId) },
    }).then((data) => {
      if (data == null) return false;
      return true;
    });

    return existence;
  },
  async findByKeyword(searchKeyword) {
    const recipe = await Recipe.findAll({
      logging: console.log,
      attributes: [
        "dish_id",
        "name",
        "views",
        "image_url1",
        "image_url2",
        [
          Sequelize.fn("COUNT", Sequelize.col("`RecipeLikes`.`dish_id`")),
          "likes",
        ],
        [Sequelize.col("`User`.`nickname`"), "nickname"],
      ],
      where: {
        name: {
          [Op.like]: `%${searchKeyword}%`,
        },
      },
      group: ["dish_id"],
      include: [
        {
          model: RecipeLike,
          attributes: [],
          required: false,
        },
        {
          model: User,
          attributes: [],
          required: false,
        },
      ],
    });

    return recipe;
  },
  async createRecipeInformation({
    name,
    method,
    category,
    imageUrl1,
    imageUrl2,
    ingredient,
    serving,
    cookingTime,
    userId,
  }) {
    const createdRecipe = await Recipe.create({
      name,
      method,
      category,
      image_url1: imageUrl1,
      image_url2: imageUrl2,
      ingredient,
      views: 0,
      serving,
      cooking_time: cookingTime,
      user_id: userId,
    });

    return createdRecipe;
  },
  async createStep({ content, imageUrl, step, dishId }) {
    const createdStep = await Step.create({
      content,
      image_url: imageUrl,
      step,
      dish_id: dishId,
    });

    return createdStep;
  },
  async createRecipeComment({ userId, dishId, content }) {
    const createdComment = await RecipeComment.create({
      content,
      user_id: userId,
      dish_id: dishId,
    });

    return createdComment;
  },
  async createRecipeLike({ userId, dishId }) {
    const createdLike = await RecipeLike.create({
      user_id: userId,
      dish_id: dishId,
    });

    return createdLike;
  },
  async updateRecipeInformation({
    name,
    method,
    category,
    imageUrl1,
    imageUrl2,
    ingredient,
    serving,
    views,
    cookingTime,
    dishId,
  }) {
    const updatedRecipeInformation = await Recipe.update(
      {
        name,
        method,
        category,
        image_url1: imageUrl1,
        image_url2: imageUrl2,
        ingredient,
        serving,
        views,
        cooking_time: cookingTime,
      },
      { where: { dish_id: Number(dishId) } }
    );

    return updatedRecipeInformation;
  },
  async updateStep({ stepId, content, imageUrl }) {
    const updatedStep = await Step.update(
      {
        content,
        image_url: imageUrl,
      },
      { where: { step_id: Number(stepId) } }
    );

    return updatedStep;
  },
  async updateRecipeComment({ commentId, content }) {
    const updatedComment = await RecipeComment.update(
      {
        content,
      },
      { where: { comment_id: Number(commentId) } }
    );
    return updatedComment;
  },
  async deleteRecipeInformation({ dishId }) {
    const deletedRecipe = await Recipe.destroy({
      where: {
        dish_id: Number(dishId),
      },
    });

    return deletedRecipe;
  },
  async deleteComment({ commentId }) {
    const deletedComment = await RecipeComment.destroy({
      where: {
        comment_id: Number(commentId),
      },
    });

    return deletedComment;
  },
};
