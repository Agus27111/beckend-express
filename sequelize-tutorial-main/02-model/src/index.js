import express from "express";
const app = express();
const port = 3000;
// import sequelize from "./utils/db.js";
// import user from "./models/userModel2.js";
import db from "./models/index.js";
const User = db.models.User;

app.get("/", (req, res) => {
  try {
    User.findAll().then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

app.get("/insert", (req, res) => {
  User.create({
    namaUser: "user1",
    email: "user1@user",
  }).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
