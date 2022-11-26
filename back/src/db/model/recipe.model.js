import { Recipe, RecipeLike } from "../schema";
import { Op, Sequelize } from "sequelize";

export default {
  async findByKeyword(searchKeyword) {
    const recipe = await Recipe.findAll({
      attributes: ["dish_id", "name", "views", "image_url1", "image_url2"],
      where: {
        name: {
          [Op.like]: `%${searchKeyword}%`,
        },
      },
      group: ["dish_id"],
      include: [
        {
          model: RecipeLike,
          attributes: [[Sequelize.fn("COUNT", Sequelize.col("*")), "likes"]],
          required: false,
        },
      ],
    });

    return recipe;
  },
};
