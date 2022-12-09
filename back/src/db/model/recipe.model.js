import {
  Recipe,
  RecipeLike,
  User,
  RecipeComment,
  RecipeStar,
  Step,
} from "../schema";
import { Op, Sequelize, QueryTypes } from "sequelize";
import sequelize from "../../configs/sequelize";

export default {
  async findAll({ lastRecipeId, method, category, postsPerPage }) {
    const recipes = await sequelize.query(
      `
    SELECT dish_id as dishId, name, method, category, image_url1 as smallThumbnailUrl, image_url2 as largeThumbnailUrl, views,COALESCE(likes, 0) as likes 
    FROM recipe_informations as ri
    LEFT JOIN (SELECT dish_id as rl_di, COUNT(*) as likes FROM recipe_likes group by dish_id) as rl
    ON ri.dish_id = rl_di
    WHERE
    ${lastRecipeId ? `ri.dish_id < ${lastRecipeId} AND ` : ""}
    ${method ? `method = '${method}' AND ` : "method = method AND"}
    ${category ? `category = "${category}"` : "category = category"}
    ORDER BY ri.dish_id DESC ${postsPerPage ? `LIMIT ${postsPerPage}` : ""}`,
      {
        type: QueryTypes.SELECT,
      }
    );

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

  async findExistenceOfStar({ userId, dishId }) {
    const existence = await RecipeStar.findOne({
      where: { user_id: Number(userId), dish_id: Number(dishId) },
    }).then((data) => {
      if (data == null) return false;
      return true;
    });

    return existence;
  },

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
          model: User,
          attributes: [],
          required: false,
        },
        {
          model: RecipeLike,
          attributes: [],
          required: false,
        },
        {
          model: RecipeStar,
          attributes: [],
          required: false,
          where: { user_id: "`User`.`user_id`" },
        },
      ],
      order: [
        [
          Sequelize.literal(
            "((`RecipeInformation`.`views` * 1.5) + (COUNT(`RecipeLikes`.`dish_id`) * 1.5) + (IFNULL(AVG(`RecipeStars`.`score`),0) * 1.5)) / ((DATEDIFF(NOW(), `RecipeInformation`.`createdAt`)+1) * 1)"
          ),
          "DESC",
        ],
      ],
    });

    return recipe;
  },

  async findAllByUserId(userId) {
    const recieps = await Recipe.findAll({
      attributes: [
        "dish_id",
        "name",
        "method",
        "category",
        "image_url2",
        "views",
        "createdAt",
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
          model: User,
          attributes: [],
          required: false,
        },
        {
          model: RecipeLike,
          attributes: [],
          required: false,
        },
        {
          model: RecipeStar,
          attributes: [],
          required: false,
          where: { user_id: "`User`.`user_id`" },
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

  async getConcatenatedDishId() {
    const concatenatedDishId = await Recipe.findAll({
      attributes: [
        [sequelize.fn("GROUP_CONCAT", sequelize.col("dish_id")), "dishId"],
      ],
    });

    return concatenatedDishId[0].dataValues.dishId;
  },

  async getRandomRecipe(arrayOfDishId) {
    const likes = Sequelize.fn(
      "COUNT",
      Sequelize.col("`RecipeLikes`.`dish_id`")
    );
    const nickname = Sequelize.col("`User`.`nickname`");

    const randomRecipe = await Recipe.findAll({
      subQuery: false,
      attributes: [
        "dish_id",
        "name",
        "views",
        "image_url1",
        "image_url2",
        [likes, "likes"],
        [nickname, "nickname"],
      ],
      where: { dish_id: { [Op.in]: arrayOfDishId } },
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
      order: Sequelize.literal("rand()"),
    });

    return randomRecipe;
  },

  async getLikeRecipes(userId) {
    const recipes = await sequelize.query(
      `SELECT ri.dish_id, ri.name, ri.method, ri.category, ri.image_url2, ri.views, ri.createdAt 
      FROM users AS u 
      INNER JOIN recipe_likes AS rl ON u.user_id = rl.user_id 
      INNER JOIN recipe_informations ri ON rl.dish_id = ri.dish_id 
      WHERE u.user_id = ?`,
      { replacements: [userId], type: QueryTypes.SELECT }
    );

    return recipes;
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

  async createRecipeStar({ score, userId, dishId }) {
    const createdStar = await RecipeStar.create({
      score,
      user_id: userId,
      dish_id: dishId,
    });

    return createdStar;
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

  async deleteLike({ userId, dishId }) {
    const deletedLike = await RecipeLike.destroy({
      where: {
        user_id: Number(userId),
        dish_id: Number(dishId),
      },
    });

    return deletedLike;
  },
};
