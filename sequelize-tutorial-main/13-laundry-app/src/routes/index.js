import express from "express";
import personalRouter from "./personalRouter.js";
const router = express.Router();

router.use("/app", personalRouter);

router.use("*", (req, res, next) => {
  res.status(404).json({
    errors: ["Page Not found"],
    message: "Internal server error",
    data: null,
  });
});

export default router;
