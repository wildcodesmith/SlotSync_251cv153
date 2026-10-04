import express from "express";
import requireCoordinatorRole from "../controllers/middlewares/requireCoordinatorRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import { bookRoomRequest } from "../controllers/bookRoomRequestController.js";

const bookRoomRequestRouter = express.Router();

bookRoomRequestRouter.post("/", verifyToken,requireCoordinatorRole, bookRoomRequest);

export default bookRoomRequestRouter;