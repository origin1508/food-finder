import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const RecipeLike = sequelize.define(
  "RecipeLike",
  {},
  {
    sequelize,
    timestamps: true,
    tableName: "recipe_likes",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default RecipeLike;
