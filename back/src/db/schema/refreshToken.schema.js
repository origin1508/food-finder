import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    token: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "refresh_tokens",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default RefreshToken;