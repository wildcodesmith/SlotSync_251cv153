import express from 'express'
const adminDashboardLogoutRouter = express.Router();
 
 adminDashboardLogoutRouter.post("/", (req, res) => {

    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully"
    });
});

export default adminDashboardLogoutRouter;