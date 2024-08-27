import express from "express";
const app = express();
const port = 3000;
// import sequelize from "./utils/db.js";
// import user from "./models/userModel2.js";
import db from "./models/index.js";
import sequelize from "./utils/db.js";
import { Op } from "sequelize";
const User = db.models.User;

app.get("/", async (req, res) => {
  try {
    let data = await User.findAll({});
    res.send(data);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

app.get("/insert", async (req, res) => {
  // User.create({
  await User.bulkCreate([
    {
      name: "Pojok Code",
      dob: new Date(),
      isActive: true,
    },
  ]).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
