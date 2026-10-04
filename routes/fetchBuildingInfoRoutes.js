// import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import {  fetchBuildingInfoController} from "../controllers/fetchBuildingInfoController.js";

const fetchBuildingInfoRouter = express.Router()

fetchBuildingInfoRouter.get('/',verifyToken,fetchBuildingInfoController)

export default fetchBuildingInfoRouter;