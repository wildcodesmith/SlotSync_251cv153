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
import convenorDashboardRouter from './routes/convenorDashboardRoutes.js';
import facultyDashboardRouter from './routes/facultyDashboardRoutes.js';
import studentDashboardRouter from './routes/studentDashboardRoutes.js';
import fetchAdminAccountInfoRouter from './routes/fetchAdminAccountInfoRoutes.js';
import fetchAdminDashboardInfoRouter from './routes/fetchAdminDashboardInfoRoutes.js';
import fetchBuildingInfoRouter from './routes/fetchBuildingInfoRoutes.js';
import filterAdminBuildingsRouter from './routes/filterAdminBuildingsRoutes.js';
import addNewBuildingRouter from './routes/addNewBuildingRoutes.js';
import deleteFacilityRouter from './routes/deleteFacilityRoutes.js';
import getBuildingRoomsRouter from './routes/getBuildingRoomsRoutes.js';
import updateRoomRouter from './routes/updateRoomRoutes.js';
import deleteRoomRouter from './routes/deleteRoomRoutes.js';
import addRoomRouter from './routes/addRoomRoutes.js';
import filterAdminRoomsRouter from './routes/filterAdminRoomsRoutes.js';


const app = express();
const port = 3000;

//mongoose database setup 
mongoose.connect(process.env.MONGOOSE_STRING)
import Account from './models/account.js';
import Building from './models/admin/facilities/building.js';
import Room from './models/admin/facilities/room.js';


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
app.use('/convenorDashboard',convenorDashboardRouter)
app.use('/facultyDashboard',facultyDashboardRouter)
app.use('/studentDashboard',studentDashboardRouter)
app.use('/fetchAdminAccountInfo', fetchAdminAccountInfoRouter)
app.use('/fetchAdminDashboardInfo', fetchAdminDashboardInfoRouter)
app.use('/fetchBuildingInfo', fetchBuildingInfoRouter)
app.use('/filterAdminBuildings', filterAdminBuildingsRouter)
app.use('/addNewBuilding', addNewBuildingRouter)
app.use('/deleteFacility', deleteFacilityRouter)
app.use('/getBuildingRooms', getBuildingRoomsRouter)
app.use('/updateRoom', updateRoomRouter)
app.use('/deleteRoom',deleteRoomRouter)
app.use('/deleteRoom',deleteRoomRouter)
app.use('/addRoom',addRoomRouter)
app.use('/filterAdminRooms',filterAdminRoomsRouter)



app.use((req, res) => {
    res.status(404).render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
