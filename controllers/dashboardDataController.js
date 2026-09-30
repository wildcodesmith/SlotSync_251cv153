
import 'dotenv/config';

import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGOOSE_STRING)
import Account from '../models/account.js';

export const dashboardDataFetchingFunc = async (req, res) => {
    const userFetched = await Account.findById(req.user.userId)
    res.json({message : 'success' , userName : userFetched.userName})
}