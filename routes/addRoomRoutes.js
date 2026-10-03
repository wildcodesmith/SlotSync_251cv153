import express from "express";
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { addRoomController } from "../controllers/addRoomController.js";

const addRoomRouter = express.Router();

addRoomRouter.post("/",verifyToken,requiredRole("admin"), addRoomController);

export default addRoomRouter;

