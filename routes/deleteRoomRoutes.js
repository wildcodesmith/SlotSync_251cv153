import express from 'express'
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import { deleteRoomController } from '../controllers/deleteRoomController.js';

const deleteRoomRouter = express.Router()

 

deleteRoomRouter.delete('/',verifyToken,requiredRole("admin"),deleteRoomController)

export default deleteRoomRouter;