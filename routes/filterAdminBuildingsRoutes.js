import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import { filterAdminBuildingsController } from "../controllers/filterAdminBuildingsController.js";

const filterAdminBuildingsRouter = express.Router()

filterAdminBuildingsRouter.post('/',verifyToken,requiredRole("admin"),filterAdminBuildingsController)

export default filterAdminBuildingsRouter;