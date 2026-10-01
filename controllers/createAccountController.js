//creating account handler

import Account from '../models/account.js';
import bcrypt from 'bcrypt'


export const createAccountFunc = async (req, res) => {
    try {

        let newUser = req.body;
        if (!newUser.userName || !newUser.userEmail || !newUser.password || !newUser.userBranch || !newUser.userRole) {
            return res.status(400).json({ "message": "Incomplete or incorrect information to create account. Please  try again later", 'status': 400 });
        }

        //checking if account already exists or not
        const foundEmail = await Account.findOne({
            userEmail: newUser.userEmail
        });

        if (foundEmail) {
            return res.status(400).json({
                message: "Account already exists. Please go to login page to access account",
                status: 400
            });
        }

        //checking whether email is in correct format or not
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newUser.userEmail)) {
            return res.status(400).json({ "message": "Incomplete or incorrect  information to create account. Please try again later", 'status': 400 });
        }

        //bcrypting the password before storing
        let hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;

        //storing the account credentials into the database
        const userAccount = await Account.create(newUser);

        return res.status(201).json({
            message: " account  created successfully. Please log in.",
            status: 201
        });

    } catch (error) { //handling server error

        console.log("account creation failed.", error);

        return res.status(500).json({ "message": "Internal Server Error. Account creation failed", 'status': 500, 'isok': false })
    }
}

