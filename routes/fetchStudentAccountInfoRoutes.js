import requiredStudentRole from "../controllers/middlewares/requireStudentRole.js";
import verifyToken from "../controllers/middlewares/verifyToken.js";
import express from 'express'
import { fetchStudentAccountInfo } from "../controllers/fetchStudentAccountInfoController.js";

const fetchStudentAccountInfoRouter = express.Router()

fetchStudentAccountInfoRouter.get('/',verifyToken,requiredStudentRole,fetchStudentAccountInfo)

export default fetchStudentAccountInfoRouter;