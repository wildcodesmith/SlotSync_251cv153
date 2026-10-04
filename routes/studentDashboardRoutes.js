import express from 'express'
import verifyToken from '../controllers/middlewares/verifyToken.js';
import requireStudentRole from '../controllers/middlewares/requireStudentRole.js';
import { studentDashboardControllerFunc } from '../controllers/studentDashboardController.js';

const studentDashboardRouter = express.Router();

studentDashboardRouter.get('/',verifyToken, requireStudentRole, studentDashboardControllerFunc)

export default studentDashboardRouter