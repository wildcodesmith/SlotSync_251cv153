//authenticating the user

import Account from "../models/account.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const accessAccountFunc = async (req, res) => {
    try {

     
        //checking whether the user exists or not
        const authAccount = await Account.findOne({ userEmail: req.body.userEmail });

        //if username doesnot exits then send the error
        if (!authAccount) {
            res
                .status(401)
                .json({ 'error': 'invalid Credentials', 'status': 401 })
            return;
        }

        //matching the  password
        let authAccountPassword = authAccount.password;
        let isPasswordCorrect = await bcrypt.compare(req.body.password, authAccountPassword)

        //accessing secret key to generate jwt token
        let SECRET_KEY = process.env.MASTER_KEY;
        if (isPasswordCorrect) { //password matched
            const token = jwt.sign(
                { 
                    userId: authAccount._id ,
                    userRole: authAccount.userRole
                },
                SECRET_KEY,
                { expiresIn: '1h' })
            
                //storing the token in HTTPOnly cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                samSite: "lax",
                maxAge: 60 * 60 * 1000
            })
            return res.json({ //redirect user to the dashboard page
                redirect:"/dashboard" 
            })

        } else { //password didn't match
            return res
                .status(401)
                .json({ 'error': "invalid credentials", status: 401 })

        }


    } catch (error) {
        console.log('failed to login account', error)
        res
            .status(500)
            .json({ 'error': "internal server error", status: 500 })
    }
}