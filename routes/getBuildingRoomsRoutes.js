// import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import {  getBuildingRoomsController} from "../controllers/getBuildingRoomsController.js";

const getBuildingRoomsRouter = express.Router()

getBuildingRoomsRouter.post('/',verifyToken,getBuildingRoomsController)

export default getBuildingRoomsRouter;