import express from 'express'
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import { addNewBuildingControllerFunc } from '../controllers/addNewBuildingController.js';

const addNewBuildingRouter = express.Router()

 

addNewBuildingRouter.post('/',verifyToken,requiredRole("admin"),addNewBuildingControllerFunc)

export default addNewBuildingRouter;