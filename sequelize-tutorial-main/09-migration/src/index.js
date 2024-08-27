const express = require("express");
const app = express();
const { User } = require("./models");

app.get("/", async (req, res) => {
  const data = await User.findAll({});
  res.json(data);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
