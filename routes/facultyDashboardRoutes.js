import express from 'express'

import requireCoordinatorRole from '../controllers/middlewares/requireCoordinatorRole.js';
import verifyToken from '../controllers/middlewares/verifyToken.js';

import { facultyDashboardControllerFunc } from '../controllers/facultyDashboardController.js';

const facultyDashboardRouter = express.Router();

facultyDashboardRouter.get('/',verifyToken, requireCoordinatorRole, facultyDashboardControllerFunc)

export default facultyDashboardRouter