import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js";
import { encript } from "../utils/bcrypt.js";

const User = sequelize.define("User", {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", encript(value));
    },
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

User.sync();

export default User;
