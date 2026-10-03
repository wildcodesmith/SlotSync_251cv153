import express from "express"
import { respondToBookingController } from "../controllers/respondToBookingController.js"

const respondToBookingRouter = express.Router()

respondToBookingRouter.post("/", respondToBookingController)

export default respondToBookingRouter