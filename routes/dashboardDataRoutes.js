import express from "express";

import { dashboardDataFetchingFunc } from "../controllers/dashboardDataController.js";
import  verifyToken  from "../controllers/middlewares/verifyToken.js";

const dashboardDataRouter = express.Router();

dashboardDataRouter.get('/', verifyToken, dashboardDataFetchingFunc)

export default dashboardDataRouter;