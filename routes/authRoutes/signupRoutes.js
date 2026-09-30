import express from 'express'

//creating sign up route
const signupRouter = express.Router();
signupRouter.get('/',(req,res) => {
    res.render("auth/signup.ejs")
})
export default signupRouter;