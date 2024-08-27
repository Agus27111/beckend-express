const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const errorHandling = require("./controllers/errorHandling");

const app = express();

//middleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Cuy");
});

//routes
app.use("/api", userRoute);

//error handling middleware
app.use(errorHandling);

PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`aplikasi berjalan di http://localhost:${PORT}`);
});
