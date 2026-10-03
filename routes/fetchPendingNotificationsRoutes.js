import express from "express";

import { fetchPendingNotificationsController } from "../controllers/fetchPendingNotificationsController.js";

const fetchPendingNotificationsRouter = express.Router();

fetchPendingNotificationsRouter.get("/", fetchPendingNotificationsController);

export default fetchPendingNotificationsRouter;