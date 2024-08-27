import express from "express";
const app = express();
import db from "./models/index.js";

app.get("/", async (req, res) => {
  const data = await db.models.User.findAll({});
  res.json(data);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
