import PendingNotification from "../models/admin/pendingNotification.js";

export const fetchMyBookingRequests = async (req, res) => {

    try {

        const userId = req.user.userId;

        const requests = await PendingNotification.find({
            user: userId
        })
        .populate("room")
        .populate("building")
        .populate("user");

        return res.status(200).json(requests);

    } catch (error) {

        console.log("Failed to fetch booking requests:", error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};