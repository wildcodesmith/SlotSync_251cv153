 
import Account from "../models/account.js";

export const fetchStudentDashboardData = async (req, res) => {

    try {

        const studentInfo = await Account.findById(req.user.userId)
        res.status(200).json({userName : studentInfo.userName})

    } catch (error) {

        console.log(
            "Failed to fetch student dashboard data:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    }

};