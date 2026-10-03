import express from "express";
import requiredRole from "../controllers/middlewares/requireRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";

import deleteUserController
    from "../controllers/deleteUserController.js";

const deleteUserRouter = express.Router();

deleteUserRouter.delete("/",verifyToken,requiredRole("admin"),deleteUserController);

export default deleteUserRouter;