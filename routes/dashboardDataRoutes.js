//Fetches data of the currently authenticated user and determines the appropriate dashboard based on the user's role.
import express from "express";

import { dashboardDataFetchingFunc } from "../controllers/dashboardDataController.js";
import  verifyToken  from "../controllers/middlewares/verifyToken.js";

const dashboardDataRouter = express.Router();

dashboardDataRouter.get('/', verifyToken, dashboardDataFetchingFunc)

export default dashboardDataRouter;