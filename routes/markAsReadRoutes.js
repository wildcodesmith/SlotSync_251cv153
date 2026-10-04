import express from "express";
import requireCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { markAsRead } from "../controllers/markAsReadController.js";

const markAsReadRouter = express.Router();


markAsReadRouter.post("/", verifyToken,requireCoordinatorRole,markAsRead);

export default markAsReadRouter;