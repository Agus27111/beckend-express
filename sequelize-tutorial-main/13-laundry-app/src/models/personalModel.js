import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js";
import User from "./userModel.js";

const Personal = sequelize.define(
  "Personal",
  {
    personalId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    middleName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.INTEGER,
    },
    birtPlace: {
      type: Sequelize.STRING,
    },
    birtDate: {
      type: Sequelize.DATE,
    },
    phone: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "personal",
    underscored: true,
  }
);

Personal.hasMany(User, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

User.belongsTo(Personal, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Personal.sync();

export default Personal;
