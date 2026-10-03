import express from "express";

import { fetchUsersController } from "../controllers/fetchUsersController.js";

const fetchUsersRouter = express.Router();

fetchUsersRouter.get("/", fetchUsersController);

export default fetchUsersRouter;