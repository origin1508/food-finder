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

  async findAllByUserId(userId) {
    const recieps = await Recipe.findAll({
      attributes: [
        'dish_id',
        'name',
        'method',
        'category',
        'image_url2',
        'views',
        'createdAt'
      ],
      where: {
        user_id: userId,
      },
    });

    return recieps;
  },

  
};
