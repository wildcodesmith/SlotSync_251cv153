import express from "express";
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { filterUsersController } from "../controllers/filterUsersController.js";

const filterUsersRouter = express.Router();

filterUsersRouter.post("/",verifyToken,requiredRole("admin"), filterUsersController);

export default filterUsersRouter;