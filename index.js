import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

//importing routers
import loginRouter from "./routes/authRoutes/loginRoutes.js";
import signupRouter from "./routes/authRoutes/signupRoutes.js";
import dashboardRouter from './routes/dashboardRoutes.js';
import dashboardDataRouter from './routes/dashboardDataRoutes.js'

 
const app = express();
const port = 3000;

//mongoose database setup 
mongoose.connect(process.env.MONGOOSE_STRING)
import Account from './models/account.js';



//serving static files
app.use(express.static('public'))

//json middleware
app.use(express.json())

//ejs setup
app.set('view engine')

//handling routes
app.use('/', loginRouter)
app.use('/accessAccount', loginRouter)
app.use('/signUp', signupRouter)
app.use('/createAccount' , signupRouter )
app.use('/dashboard', dashboardRouter)
app.use('/dashboardData', dashboardDataRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
