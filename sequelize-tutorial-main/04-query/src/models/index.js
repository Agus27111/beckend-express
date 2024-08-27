import db from "../utils/db.js";
import User from "./userModel.js";

db.define("User", User, {
  tableName: "users",
  underscored: true,
  freezeTableName: true,
  indexes: [
    {
      fields: ["email"],
      unique: true,
    },
    {
      fields: ["nama_user"],
    },
  ],
});
db.sync();

export default db;
