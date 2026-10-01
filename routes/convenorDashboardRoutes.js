import express from 'express'
import { convenorDashboardControllerFunc } from '../controllers/convenorDashboardController.js';

const convenorDashboardRouter = express.Router();

convenorDashboardRouter.get('/', convenorDashboardControllerFunc)

export default convenorDashboardRouter