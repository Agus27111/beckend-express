const { Sequelize } = require("sequelize");
const db = require("../utils/db.connection");

const Address = db.define(
  "address",
  {
    addressId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    addressType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = Address;
