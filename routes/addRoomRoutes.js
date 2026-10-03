import express from "express";
import { addRoomController } from "../controllers/addRoomController.js";

const addRoomRouter = express.Router();

addRoomRouter.post("/", addRoomController);

export default addRoomRouter;

