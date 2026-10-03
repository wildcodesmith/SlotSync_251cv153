import express from "express";
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { fetchAllBookingsController } from "../controllers/fetchAllBookingsController.js";

const fetchAllBookingsRouter = express.Router();

fetchAllBookingsRouter.get("/",verifyToken,requiredRole("admin"),fetchAllBookingsController );

export default fetchAllBookingsRouter;