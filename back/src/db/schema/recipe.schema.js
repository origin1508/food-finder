import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const RecipeInformation = sequelize.define(
  "RecipeInformation",
  {
    dish_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serving: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cooking_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "recipe_informations",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default RecipeInformation;
