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
    // select age, email nama_user from users where user_id in(1,2,3) and email like 'user%'
    let data = await User.findAndCountAll({
      where: {
        [Op.and]: [
          { userId: { [Op.in]: [1, 2, 3] } },
          { email: { [Op.like]: "user%" } },
        ],
      },
    });
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
      namaUser: "user10",
      email: "user10@user",
      age: 20,
      isActive: true,
    },
    {
      namaUser: "user20",
      email: "user20@user",
      age: 21,
      isActive: true,
    },
    {
      namaUser: "user30",
      email: "user30@user",
      age: 22,
      isActive: true,
    },
  ]).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
