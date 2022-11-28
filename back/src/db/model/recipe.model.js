import { Recipe, RecipeLike } from "../schema";
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
      ],
    });

    return recipe;
  },
};
