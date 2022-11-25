import sequelize from "../../configs/sequelize";
import { DataTypes } from "sequelize";

const Step = sequelize.define(
  "Step",
  {
    step_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iamge_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "steps",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default Step;
