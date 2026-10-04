import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
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
import fetchUsersRouter from "./routes/fetchUsersRoutes.js";
import filterUsersRouter from "./routes/filterUsersRoutes.js";
import fetchPendingNotificationsRouter from './routes/fetchPendingNotificationsRoutes.js';
import respondToBookingRouter from './routes/respondToBookingRoutes.js';
import fetchAllBookingsRouter from './routes/fetchAllBookingsRoutes.js';
import deleteUserRouter from './routes/deleteUserRoutes.js';

import fetchCoordinatorAccountInfoRouter from './routes/fetchCoordinatorAccountInfoRoutes.js';
import coordinatorPageLogoutRouter from './routes/coordinatorPageLogoutRoutes.js';
import fetchRespondedNotificationsRouter from './routes/fetchRespondedNotificationsRoutes.js';
import markAsReadRouter from './routes/markAsReadRoutes.js';
import fetchMyBookingsRouter from './routes/fetchMyBookngsRoutes.js';
import bookRoomRequestRouter from './routes/bookRoomRequestRoutes.js';
import fetchMyBookingRequestsRouter from './routes/fetchMyBookingRequestsRoutes.js';
import coordinatorDashboardDataRouter from './routes/coordinatorDashboardDataRoutes.js';

import fetchStudentDashboardDataRouter from './routes/fetchStudentDashboardDataRoutes.js';
import fetchStudentAccountInfoRouter from './routes/fetchStudentAccountInfoRoutes.js';
import studentPageLogoutRouter from './routes/studentPageLogoutRoutes.js';



const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
//mongoose database setup 
// mongoose.connect(process.env.MONGOOSE_STRING)
try {
  await mongoose.connect(mongoURI);
  console.log('Successfully connected to MongoDB Atlas');
} catch (err) {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Stop app execution if DB fails to connect
}


import Account from './models/account.js';
import Building from './models/admin/facilities/building.js';
import Room from './models/admin/facilities/room.js';
import PendingNotification from './models/admin/pendingNotification.js';
import RespondedNotification from './models/admin/respondedNotification.js';
import Booking from './models/admin/booking.js';



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
app.use("/fetchUsers", fetchUsersRouter);
app.use("/filterUsers", filterUsersRouter);
app.use("/fetchPendingNotifications", fetchPendingNotificationsRouter);
app.use("/respondToBooking", respondToBookingRouter);
app.use("/fetchAllBookings", fetchAllBookingsRouter);
app.use("/deleteUser", deleteUserRouter)
app.use("/fetchCoordinatorAccountInfo", fetchCoordinatorAccountInfoRouter)
app.use("/coordinatorPageLogout", coordinatorPageLogoutRouter)
app.use("/fetchRespondedNotifications", fetchRespondedNotificationsRouter)
app.use("/markAsRead", markAsReadRouter)
app.use("/fetchMyBookings", fetchMyBookingsRouter)
app.use("/bookRoomRequest", bookRoomRequestRouter)
app.use("/fetchMyBookingRequests", fetchMyBookingRequestsRouter)
app.use("/fetchCoordinatorDashboardData", coordinatorDashboardDataRouter)

app.use("/fetchStudentDashboardData", fetchStudentDashboardDataRouter)
app.use("/fetchStudentAccountInfo", fetchStudentAccountInfoRouter)
app.use("/studentPageLogout", studentPageLogoutRouter)






app.use((req, res) => {
    res.status(404).render("404.ejs");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
