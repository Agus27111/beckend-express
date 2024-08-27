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
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
};

export default User;
