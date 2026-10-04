import express from "express";
import requireCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import { fetchMyBookings } from "../controllers/fetchMyBookingsController.js";

const fetchMyBookingsRouter = express.Router();

fetchMyBookingsRouter.get("/",verifyToken,requireCoordinatorRole,fetchMyBookings);

export default fetchMyBookingsRouter;