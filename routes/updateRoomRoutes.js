import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import { updateRoomController } from "../controllers/updateRoomController.js";

const updateRoomRouter = express.Router()

updateRoomRouter.put('/', verifyToken, requiredRole("admin"), updateRoomController)

export default updateRoomRouter;