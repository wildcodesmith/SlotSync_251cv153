import PendingNotification from "../models/admin/pendingNotification.js"

export const fetchPendingNotificationsController = async (req, res) => {

    try {

        const notifications = await PendingNotification.find()
            .populate("user")
            .populate("room")
            .populate("building")

        res.status(200).json(notifications)

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server error"
        })

    }

}