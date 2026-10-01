//verif the token to authenticate the user

import jwt from "jsonwebtoken";
import 'dotenv/config';

function verifyToken(req, res, next) {
    //extract the token from cookies
    const token = req.cookies.token;

    if (!token) { //if no token is present then deny the access
        return res
            .status(401)
            .render('unauthorizedPage.ejs') //Access denied! Authorization required.'

    }
    try {
        //verify the token using jwt
        const decoded = jwt.verify(token, process.env.MASTER_KEY)

        //if token is verified successfully then it will return the user_id (mongodb ID) and userRole
        req.user = decoded;

        next(); // after this middleware go to the controller function

    } catch (error) { //if token is not verified then throw error
        res
            .status(400)
            .json({ 'error': 'Invalid or expired token', status: 400 })


    }
}

export default verifyToken