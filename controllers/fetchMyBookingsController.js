import Booking from "../models/admin/booking.js";

export const fetchMyBookings = async (req, res) => {

    try {

        const bookings = await Booking
            .find({user : req.user.userId})
            .populate("user", "userName userEmail userBranch userRole")
            .populate("room", "roomName roomType capacity")
            .populate("building", "buildingName buildingType")
            .sort({ createdAt: -1 });



        res.status(200).json(bookings);


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch bookings"
        });

    }

};


 