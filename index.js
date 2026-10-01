import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

//importing routers
import loginRouter from "./routes/authRoutes/loginRoutes.js";
import signupRouter from "./routes/authRoutes/signupRoutes.js";
import dashboardRouter from './routes/dashboardRoutes.js';
import dashboardDataRouter from './routes/dashboardDataRoutes.js'
import adminDashboardRouter from './routes/adminDashboardRoutes.js'
import adminDashboardLogoutRouter from './routes/adminDashboardLogoutRoutes.js'

 
const app = express();
const port = 3000;

//mongoose database setup 
mongoose.connect(process.env.MONGOOSE_STRING)
import Account from './models/account.js';


//middlewares
//serving static files
app.use(express.static('public'))

//json middleware
app.use(express.json())

//cookie parser middleware
app.use(cookieParser())

//ejs setup
app.set('view engine')

//handling routes
app.use('/', loginRouter)
app.use('/accessAccount', loginRouter)
app.use('/signUp', signupRouter)
app.use('/createAccount' , signupRouter )
app.use('/dashboard', dashboardRouter)
app.use('/dashboardData', dashboardDataRouter)
app.use('/adminDashboard', adminDashboardRouter)
app.use('/adminDashboardLogout', adminDashboardLogoutRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
