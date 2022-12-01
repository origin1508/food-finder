import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const RecipeComment = sequelize.define(
  "RecipeComment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "recipe_comments",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default RecipeComment;
