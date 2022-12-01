import { Recipe, RecipeLike, User, RecipeComment, RecipeStar } from "../schema";
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
};
