import PendingNotification from "../models/admin/pendingNotification.js"
import RespondedNotification from "../models/admin/respondedNotification.js"
import Booking from "../models/admin/booking.js"

export const respondToBookingController = async (req, res) => {



    try {

        const { notificationId, status, responseMessage } = req.body

        if (!notificationId || !status) {
            return res.status(400).json({
                message: "Notification ID and status are required"
            })
        }

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            })
        }

        const pendingNotification = await PendingNotification.findById(notificationId)

        if (!pendingNotification) {
            return res.status(404).json({
                message: "Notification not found"
            })
        }

        //move the  notification to respondedNotification
        const respondedNotification = await RespondedNotification.create({
            user: pendingNotification.user,
            room: pendingNotification.room,
            building: pendingNotification.building,
            date: pendingNotification.date,
            startTime: pendingNotification.startTime,
            endTime: pendingNotification.endTime,
            status: status,
            responseMessage: responseMessage || "",
            createdAt: new Date(),
            respondedAt: new Date()
        })

        //move the  notification to booking
        await Booking.create({
            user: pendingNotification.user,
            room: pendingNotification.room,
            building: pendingNotification.building,
            date: pendingNotification.date,
            startTime: pendingNotification.startTime,
            endTime: pendingNotification.endTime,
            status: status,
            responseMessage: responseMessage || "",
            createdAt: new Date(),
            respondedAt: new Date()
        })

        //delete the notification message from pendingNotification
        await PendingNotification.findByIdAndDelete(notificationId)

        res.status(200).json({
            message: "Booking response saved successfully",
            respondedNotification
        })



    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server error"
        })


    }

}