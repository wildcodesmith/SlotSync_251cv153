import RespondedNotification from "../models/admin/respondedNotification.js";

export const fetchRespondedNotifications = async (req, res) => {


    try {

        // ID of the currently logged-in Faculty/Convenor
        const userId = req.user.userId;
       

        const notifications = await RespondedNotification.find({
            user: userId
        })
            .populate("user")
            .populate("room")
            .populate("building");

        return res.status(200).json(notifications);
  

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });

    }
};