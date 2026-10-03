import express from 'express'

import requireCoordinatorRole from '../controllers/middlewares/requireCoordinatorRole.js';
import verifyToken from '../controllers/middlewares/verifyToken.js';

import { convenorDashboardControllerFunc } from '../controllers/convenorDashboardController.js';

const convenorDashboardRouter = express.Router();

convenorDashboardRouter.get('/',verifyToken,requireCoordinatorRole, convenorDashboardControllerFunc)

export default convenorDashboardRouter