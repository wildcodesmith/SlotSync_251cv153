import express from 'express';

//importing routes
import loginRouter from "./routes/authRoutes/loginRoutes.js";
import signupRouter from "./routes/authRoutes/signupRoutes.js";
 
const app = express();
const port = 3000;

//serving static files
app.use(express.static('public'))

//ejs setup
app.set('view engine')

//handling routes
app.use('/', loginRouter)
app.use('/signUp', signupRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});