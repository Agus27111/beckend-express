import express from "express";
import { setPersonal } from "../controllers/personalController.js";
const personalRouter = express.Router();

personalRouter.post("/personals", setPersonal);

export default personalRouter;
