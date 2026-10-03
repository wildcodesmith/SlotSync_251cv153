import express from "express";

import { filterAdminRoomsController } from "../controllers/filterAdminRoomsController.js";

const filterAdminRoomsRouter = express.Router();

filterAdminRoomsRouter.post("/",filterAdminRoomsController);

export default filterAdminRoomsRouter;