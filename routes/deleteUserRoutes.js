import express from "express";

import deleteUserController
    from "../controllers/deleteUserController.js";

const deleteUserRouter = express.Router();

deleteUserRouter.delete("/",deleteUserController);

export default deleteUserRouter;