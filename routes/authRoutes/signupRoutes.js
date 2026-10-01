import express from 'express'
import { createAccountFunc } from '../../controllers/createAccountController.js';

//creating sign up route
const signupRouter = express.Router();
signupRouter.get('/',(req,res) => {
    res.render("auth/signup.ejs") //sending signup page
})

//post request to create an account
signupRouter.post('/' , createAccountFunc)

export default signupRouter;