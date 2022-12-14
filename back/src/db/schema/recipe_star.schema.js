import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const RecipeStar = sequelize.define(
  "RecipeStar",
  {
    dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "recipe_stars",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default RecipeStar;
