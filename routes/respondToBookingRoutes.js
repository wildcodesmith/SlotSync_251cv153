import express from "express"
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { respondToBookingController } from "../controllers/respondToBookingController.js"

const respondToBookingRouter = express.Router()

respondToBookingRouter.post("/", verifyToken,requiredRole("admin"),respondToBookingController)

export default respondToBookingRouter