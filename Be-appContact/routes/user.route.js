const userController = require("../controllers/user.controller");
const route = require("express").Router();

route.post("/user", userController.register);
route.get("/activate/:id", userController.activate); // Endpoint untuk aktivasi menggunakan kode dari body request
route.post("/login", userController.login);
route.post("/check-session", userController.checkSession);

module.exports = route;
