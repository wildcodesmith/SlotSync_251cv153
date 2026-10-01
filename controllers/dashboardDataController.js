
import 'dotenv/config';

import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGOOSE_STRING)
import Account from '../models/account.js';

export const dashboardDataFetchingFunc = async (req, res) => {
    try {
        
        const userFetched = await Account.findById(req.user.userId)
        if(!userFetched){
            return res.status(404).json({
                message : "User not found"
            })
        }

        res.json({message : 'success' , redirect : `/${userFetched.userRole}Dashboard`})

    } catch (error) {
        console.log("Dashboard data error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
    
}