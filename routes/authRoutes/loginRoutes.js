import express from 'express'
import { accessAccountFunc } from '../../controllers/accessAccountController.js';

//creating route to login page
const loginRouter = express.Router();

 
loginRouter.get('/', (req,res) => {
    res.render("auth/login.ejs")
})
loginRouter.post('/', accessAccountFunc)

export default loginRouter;