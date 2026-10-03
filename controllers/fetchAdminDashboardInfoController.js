import Account from "../models/account.js"
import Room from "../models/admin/facilities/room.js"
import Booking from "../models/admin/booking.js"
import PendingNotification from "../models/admin/pendingNotification.js"


export const fetchAdminDashboardInfoController  = async (req,res) => {
     
    try {

        //total users
        const totalUsers = await Room.countDocuments({ 
            userRole : {$ne : "admin"}
         })

         // Total facilities
        const totalFacilities = await Room.countDocuments();


        // Today's date
        const today = new Date().toISOString().split("T")[0];


        // Today's bookings
        const todaysBookings = await Booking.countDocuments({
            date: today
        });


        // Pending booking requests
        const pendingRequests =
            await PendingNotification.countDocuments();


        res.status(200).json({

            totalFacilities,
            totalUsers,
            todaysBookings,
            pendingRequests

        });
        
    } catch (error) {
        res.status(500).json({message : "Failed to Info. Internal Server Error"})
    }   


}