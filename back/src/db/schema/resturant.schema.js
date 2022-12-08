import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const Restaurant = sequelize.define(
  "Restaurant",
  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    road_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    map_x: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    map_y: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "restaurant_bookmarks",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default Restaurant;
