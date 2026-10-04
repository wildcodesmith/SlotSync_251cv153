import express from "express";

import verifyToken from "../controllers/middlewares/verifyToken.js";
import requireCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import { fetchMyBookingRequests } from "../controllers/fetchMyBookingRequestsController.js";

const fetchMyBookingRequestsRouter = express.Router();

fetchMyBookingRequestsRouter.get("/",verifyToken, requireCoordinatorRole,fetchMyBookingRequests)
export default fetchMyBookingRequestsRouter;