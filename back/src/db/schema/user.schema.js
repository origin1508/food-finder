import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "https://foodfinder-static-storage.s3.ap-northeast-2.amazonaws.com/%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84.jpg",
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "users",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default User;
