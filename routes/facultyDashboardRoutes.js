import express from 'express'
import { facultyDashboardControllerFunc } from '../controllers/facultyDashboardController.js';

const facultyDashboardRouter = express.Router();

facultyDashboardRouter.get('/', facultyDashboardControllerFunc)

export default facultyDashboardRouter