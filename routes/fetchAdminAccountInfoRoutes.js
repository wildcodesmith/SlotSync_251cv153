import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import { fetchAdminAccountInfoController } from "../controllers/fetchAdminAccountInfoController.js";

const fetchAdminAccountInfoRouter = express.Router()

fetchAdminAccountInfoRouter.get('/',verifyToken,requiredRole("admin"),fetchAdminAccountInfoController)

export default fetchAdminAccountInfoRouter;