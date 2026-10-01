import  jwt  from "jsonwebtoken";
import 'dotenv/config';

function verifyToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]
    const token = req.cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({ error: 'Access denied! Authorization required.' })

    }
    try {
        const decoded = jwt.verify(token, process.env.MASTER_KEY)
        req.user = decoded;
        next();
    } catch (error) {
        res
            .status(400)
            .json({ 'error': 'Invalid or expired token', status: 400 })


    }
}

export default verifyToken