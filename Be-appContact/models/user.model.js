const { Sequelize } = require("sequelize");
const db = require("../utils/db.connection");
const moment = require("moment");
const contactModel = require("./contact.model");

const User = db.define(
  "user",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "user_id",
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    activationCode: {
      type: Sequelize.STRING, // Menyimpan kode aktivasi
      allowNull: true,
    },
    expireTime: {
      type: Sequelize.DATE,
      set(value) {
        if (value !== null) {
          this.setDataValue("expireTime", moment(value).add(1, "hours"));
        } else {
          this.setDataValue("expireTime", null);
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(contactModel, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

contactModel.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

module.exports = User;
