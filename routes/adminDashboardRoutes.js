//route to control the dashboard of the admin
import express from 'express';
import { adminDashboardControllerFunc } from '../controllers/adminDashboardController.js';
import verifyToken from '../controllers/middlewares/verifyToken.js';
import requiredRole from '../controllers/middlewares/requireRole.js';


const adminDashboardRouter = express.Router();
adminDashboardRouter.get('/',verifyToken , requiredRole("admin"), adminDashboardControllerFunc )

export default adminDashboardRouter;