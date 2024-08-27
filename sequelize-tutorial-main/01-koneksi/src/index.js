import express from "express";
const app = express();
const port = 3000;
import sequelize from "./utils/db.js";

app.get("/", (req, res) => {
  sequelize
    .authenticate()
    .then(() => {
      res.send("connected ....");
    })
    .catch((err) => {
      res.send("Koneksi gagal : " + err.message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
