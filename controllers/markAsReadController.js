import RespondedNotification from "../models/admin/respondedNotification.js";
import Booking from "../models/admin/booking.js";

export const markAsRead = async (req, res) => {

     let notification = await RespondedNotification.findByIdAndDelete(req.body.notificationId)

    res.json({message: "message marked as read"})

};
