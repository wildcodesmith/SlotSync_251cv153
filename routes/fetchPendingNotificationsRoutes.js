import express from "express";
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { fetchPendingNotificationsController } from "../controllers/fetchPendingNotificationsController.js";

const fetchPendingNotificationsRouter = express.Router();

fetchPendingNotificationsRouter.get("/", verifyToken,requiredRole("admin"),fetchPendingNotificationsController);

export default fetchPendingNotificationsRouter;