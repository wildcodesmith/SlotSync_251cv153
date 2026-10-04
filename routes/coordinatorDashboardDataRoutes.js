import express from "express";

import verifyToken from "../controllers/middlewares/verifyToken.js";
import requireCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import { fetchCoordinatorDashboardData } from "../controllers/coordinatorDashboardDataController.js";
const coordinatorDashboardDataRouter = express.Router();

coordinatorDashboardDataRouter.get("/",verifyToken, requireCoordinatorRole,fetchCoordinatorDashboardData)

export default coordinatorDashboardDataRouter;