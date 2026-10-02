import express from 'express'
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import { deleteFacilityController } from '../controllers/deleteFacilityController.js';

const deleteFacilityRouter = express.Router()

 

deleteFacilityRouter.post('/',verifyToken,requiredRole("admin"),deleteFacilityController)

export default deleteFacilityRouter;