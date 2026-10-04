import express from "express";
import { fetchStudentDashboardData } from "../controllers/fetchStudentDashboardController.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import requireStudentRole from "../controllers/middlewares/requireStudentRole.js"
const fetchStudentDashboardDataRouter = express.Router();

fetchStudentDashboardDataRouter.get("/", verifyToken,requireStudentRole, fetchStudentDashboardData)


export default fetchStudentDashboardDataRouter;