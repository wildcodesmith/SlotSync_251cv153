import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import { fetchAdminDashboardInfoController } from "../controllers/fetchAdminDashboardInfoController.js";

const fetchAdminDashboardInfoRouter = express.Router()

fetchAdminDashboardInfoRouter.get('/',verifyToken,requiredRole("admin"),fetchAdminDashboardInfoController)

export default fetchAdminDashboardInfoRouter;