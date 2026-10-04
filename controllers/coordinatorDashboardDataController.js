import Booking from "../models/admin/booking.js";
import PendingNotification from "../models/admin/pendingNotification.js";

export const fetchCoordinatorDashboardData = async (req, res) => {

    try {

        const userId = req.user.userId;

        // Get pending requests of the logged-in user
        const pendingRequests = await PendingNotification.find({
            user: userId
        })
        .populate("room")
        .populate("building");


        // Get bookings of the logged-in user
        const bookings = await Booking.find({
            user: userId
        })
        .populate("room")
        .populate("building");


        // Only approved bookings
        const approvedBookings = bookings.filter(
            booking => booking.status === "approved"
        );


        // Only rejected bookings
        const rejectedBookings = bookings.filter(
            booking => booking.status === "rejected"
        );


        // Upcoming approved bookings
        const today = new Date().toISOString().split("T")[0];

        const upcomingBookings = approvedBookings
            .filter(booking => booking.date >= today)
            .sort((a, b) => a.date.localeCompare(b.date));


        return res.status(200).json({

            totalBookings: bookings.length,

            approvedBookings: approvedBookings.length,

            rejectedBookings: rejectedBookings.length,

            pendingRequests: pendingRequests.length,

            upcomingBookings: upcomingBookings

        });


    } catch (error) {

        console.log(
            "Failed to fetch coordinator dashboard data:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    }

};