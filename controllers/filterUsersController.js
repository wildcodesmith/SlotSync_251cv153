import Account from "../models/account.js";

export const filterUsersController = async (req, res) => {

    try {

        const { userRole } = req.body;

        let filter = {
            userRole: { $ne: "admin" }
        };

        if (userRole !== "all") {
            filter.userRole = userRole;
        }

        const users = await Account
            .find(filter)
            .select("-password");

        return res.status(200).json(users);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to filter users"
        });
    }
}