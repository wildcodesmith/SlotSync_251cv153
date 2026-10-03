import Account from "../models/account.js";

export const fetchUsersController = async (req, res) => {

    try {

        const users = await Account
            .find({ userRole: { $ne: "admin" } }) //won't include the admin account in the users section
            .select("-password"); // removing passwords before sending

        return res.status(200).json(users);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};