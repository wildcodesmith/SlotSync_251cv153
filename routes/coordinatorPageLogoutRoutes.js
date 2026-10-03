//route to logout the user 
import express from 'express'
import requireCoordinatorRole from '../controllers/middlewares/requireCoordinatorRole.js';
import verifyToken from "../controllers/middlewares/verifyToken.js";

const coordinatorPageLogoutRouter = express.Router();
 
 coordinatorPageLogoutRouter.post("/", verifyToken,requireCoordinatorRole,(req, res) => {

    //clearing the token stored in HTTPOnly cookie
    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully"
    });
});

export default coordinatorPageLogoutRouter;