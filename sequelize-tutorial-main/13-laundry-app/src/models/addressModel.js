import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js";
import Personal from "./personalModel.js";

const Address = sequelize.define("Address", {
  addressId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
  },
  province: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.STRING,
  },
});

Address.hasMany(Personal, {
  foreignKey: "personalId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Personal.belongsTo(Address, {
  foreignKey: "personalId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Address.sync();

export default Address;
