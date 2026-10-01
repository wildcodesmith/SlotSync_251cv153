import express from 'express'
import { accessAccountFunc } from '../../controllers/accessAccountController.js';

//creating route to login page
const loginRouter = express.Router();

 
loginRouter.get('/', (req,res) => {
    res.render("auth/login.ejs") //sending login page
})

loginRouter.post('/', accessAccountFunc) //post request to sign in

export default loginRouter;