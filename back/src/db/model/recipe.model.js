import { Recipe, RecipeLike, User } from "../schema";
import { Op, Sequelize } from "sequelize";

export default {
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

  async RecipeRanking() {
    const ranking = await Recipe.findAll({
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
        [
          Sequelize.fn(
            "datediff",
            Sequelize.fn("NOW"),
            Sequelize.col("`RecipeInformation`.`createdAt`")
          ),
          "now-diff",
        ],
      ],
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
      order: [
        // [
        //   (Sequelize.col("`Recipe`.`views`") +
        //     Sequelize.fn("COUNT", Sequelize.col("`RecipeLikes`.`dish_id`")) *
        //       1.55) /
        //     Sequelize.fn(
        //       "datediff",
        //       Sequelize.fn("NOW"),
        //       Sequelize.col("`Recipe`.`createdAt`")
        //     ),
        //   "DESC",
        // ],
        [
          Sequelize.fn(
            "datediff",
            Sequelize.fn("NOW"),
            Sequelize.col("`RecipeInformation`.`createdAt`")
          ),
          "ASC",
        ],
      ],
    });

    return ranking;
  },
};
