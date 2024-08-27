import db from "../utils/db.js";
import User from "./userModel.js";

db.define("User", User, {
  tableName: "users",
  underscored: true,
  freezeTableName: true,
});
db.sync();

export default db;
