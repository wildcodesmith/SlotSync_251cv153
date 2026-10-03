import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from "express";

import { fetchUsersController } from "../controllers/fetchUsersController.js";

const fetchUsersRouter = express.Router();

fetchUsersRouter.get("/",verifyToken,requiredRole("admin"), fetchUsersController);

export default fetchUsersRouter;