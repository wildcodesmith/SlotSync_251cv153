import express from "express";

import { fetchAllBookingsController } from "../controllers/fetchAllBookingsController.js";

const fetchAllBookingsRouter = express.Router();

fetchAllBookingsRouter.get("/",fetchAllBookingsController );

export default fetchAllBookingsRouter;