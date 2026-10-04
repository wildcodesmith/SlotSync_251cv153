//route to logout the user 
import express from 'express'
import requireStudentRole from '../controllers/middlewares/requireStudentRole.js';
import verifyToken from "../controllers/middlewares/verifyToken.js";

const studentPageLogoutRouter = express.Router();
 
studentPageLogoutRouter.post("/", verifyToken,requireStudentRole,(req, res) => {

    //clearing the token stored in HTTPOnly cookie
    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully"
    });
});

export default studentPageLogoutRouter;