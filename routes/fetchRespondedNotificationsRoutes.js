import express from "express";
import requireCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { fetchRespondedNotifications } from "../controllers/fetchRespondedNotificationsController.js";

const fetchRespondedNotificationsRouter = express.Router();


fetchRespondedNotificationsRouter.get("/", verifyToken,requireCoordinatorRole,fetchRespondedNotifications);

export default fetchRespondedNotificationsRouter;