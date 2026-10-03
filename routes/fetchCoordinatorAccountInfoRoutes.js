import requiredCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import { fetchCoordinatorAccountInfo } from "../controllers/fetchCoordinatorAccountInfoController.js";

const fetchCoordinatorAccountInfoRouter = express.Router()

fetchCoordinatorAccountInfoRouter.get('/',verifyToken,fetchCoordinatorAccountInfo)

export default fetchCoordinatorAccountInfoRouter;