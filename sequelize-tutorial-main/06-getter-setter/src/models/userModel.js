import { Sequelize } from "sequelize";
import { encript } from "../utils/bcript.js";
const User = {
  userId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    validate: {
      isUUID: 4,
    },
    defaultValue: Sequelize.UUIDV4,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9a-f]{64}$/i,
    },
    set(value) {
      this.setDataValue("password", encript(value));
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    set(value) {
      this.setDataValue("email", value.toLowerCase());
    },
  },
  age: {
    type: Sequelize.INTEGER,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
};

export default User;
