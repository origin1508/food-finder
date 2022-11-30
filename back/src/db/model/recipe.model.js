import { Recipe, RecipeLike, User, RecipeStar } from "../schema";
import { Op, Sequelize } from "sequelize";

export default {
  async findByKeyword(searchKeyword) {
    const likes = Sequelize.fn(
      "COUNT",
      Sequelize.col("`RecipeLikes`.`dish_id`")
    );
    const nickname = Sequelize.col("`User`.`nickname`");

    const recipe = await Recipe.findAll({
      logging: console.log,
      attributes: [
        "dish_id",
        "name",
        "views",
        "image_url1",
        "image_url2",
        [likes, "likes"],
        [nickname, "nickname"],
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

  async rankingOn7days() {
    const likes = Sequelize.fn(
      "COUNT",
      Sequelize.col("`RecipeLikes`.`dish_id`")
    );
    const nickname = Sequelize.col("`User`.`nickname`");
    const datediff = Sequelize.fn(
      "datediff",
      Sequelize.fn("NOW"),
      Sequelize.col("`RecipeInformation`.`createdAt`")
    );

    const ranking = await Recipe.findAll({
      limit: 10,
      subQuery: false,
      logging: console.log,
      attributes: [
        "dish_id",
        "name",
        "views",
        "image_url1",
        "image_url2",
        [likes, "likes"],
        [nickname, "nickname"],
      ],
      where: Sequelize.where(datediff, { [Op.lte]: 7 }),
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
        {
          model: RecipeStar,
          attributes: [],
          required: false,
        },
      ],
      // (조회수 * 가중치 + 좋아요 * 가중치 + 별점 * 가중치) / (지난날짜 * 가중치)
      order: [
        [
          Sequelize.literal(
            "((`RecipeInformation`.`views` * 1.5) + (COUNT(`RecipeLikes`.`dish_id`) * 1.5) + (IFNULL(AVG(`RecipeStars`.`score`),0) * 1.5)) / ((DATEDIFF(NOW(), `RecipeInformation`.`createdAt`)+1) * 1)"
          ),
          "DESC",
        ],
      ],
    });

    return ranking;
  },
};
