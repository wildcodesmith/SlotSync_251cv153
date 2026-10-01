//route to logout the user 
import express from 'express'
const adminDashboardLogoutRouter = express.Router();
 
 adminDashboardLogoutRouter.post("/", (req, res) => {

    //clearing the token stored in HTTPOnly cookie
    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully"
    });
});

export default adminDashboardLogoutRouter;