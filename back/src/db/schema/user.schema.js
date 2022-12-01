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
        "https://m.nongmin.com/upload/news/202007/20200711032704602/20200711032704602.jpg",
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
