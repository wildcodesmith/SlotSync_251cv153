import express from "express";
// import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";


import { filterAdminRoomsController } from "../controllers/filterAdminRoomsController.js";

const filterAdminRoomsRouter = express.Router();

filterAdminRoomsRouter.post("/",verifyToken,filterAdminRoomsController);

export default filterAdminRoomsRouter;