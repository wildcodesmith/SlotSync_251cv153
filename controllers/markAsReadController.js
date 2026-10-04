import RespondedNotification from "../models/admin/respondedNotification.js";
import Booking from "../models/admin/booking.js";

export const markAsRead = async (req, res) => {

     let notification = await RespondedNotification.findByIdAndDelete(req.body.notificationId)
     let bookingCard = {
        user : notification.user,
        room : notification.room,
        building : notification.building,
        date : notification.date,
        startTime : notification.startTime,
        endTime : notification.endTime,
        status : notification.status,
        responseMessage : notification.responseMessage
     }
     console.log(bookingCard)
     await Booking.insertOne(bookingCard)
    res.json({message: "read"})

};

// Restarting 'index.js'
// Example app listening on port 3000
// {
//   _id: new ObjectId('6ac1c87dfd13755c368420bb'),
//   user: new ObjectId('6ac1313e4a78feaa29c6ff2c'),
//   room: new ObjectId('6abf3d267808cda703983d13'),
//   building: new ObjectId('6abf39887808cda703983cf7'),
//   date: '2026-10-05',
//   startTime: '10:00',
//   endTime: '11:00',
//   status: 'rejected',
//   responseMessage: 'Your booking request has been rejected because the room is under maintenance',
//   createdAt: 2026-10-04T03:34:52.105Z
// }