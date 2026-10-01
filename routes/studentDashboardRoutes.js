import express from 'express'
import { studentDashboardControllerFunc } from '../controllers/studentDashboardController.js';

const studentDashboardRouter = express.Router();

studentDashboardRouter.get('/', studentDashboardControllerFunc)

export default studentDashboardRouter