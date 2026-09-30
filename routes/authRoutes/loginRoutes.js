import express from 'express'

// creating login page route
const loginRouter = express.Router();
loginRouter.get('/', (req,res) => {
    res.render("auth/login.ejs")
})
export default loginRouter;