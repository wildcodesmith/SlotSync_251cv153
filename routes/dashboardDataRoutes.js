import express from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { dashboardDataFetchingFunc } from "../controllers/dashboardDataController.js";

const dashboardDataRouter = express.Router();

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res
            .status(401)
            .json({ error: 'Access adenied no token provided' })

    }
    try {
        const verified = jwt.verify(token, process.env.MASTER_KEY)
        req.user = verified;
        next();
    } catch (error) {
        res
            .status(400)
            .json({ 'error': 'invalid token', status: 400 })


    }
}
dashboardDataRouter.get('/', verifyToken, dashboardDataFetchingFunc)

export default dashboardDataRouter;