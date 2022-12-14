import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const RecipeLike = sequelize.define(
  "RecipeLike",
  {
    dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "recipe_likes",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default RecipeLike;
