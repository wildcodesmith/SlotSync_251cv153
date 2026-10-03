import express from "express";

import { filterUsersController } from "../controllers/filterUsersController.js";

const filterUsersRouter = express.Router();

filterUsersRouter.post("/", filterUsersController);

export default filterUsersRouter;