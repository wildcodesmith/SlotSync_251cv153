import Account from "../models/account.js";

const deleteUserController = async (req, res) => {

    try {

        const { userId } = req.body;
        console.log(userId)

        const deletedUser = await Account.findByIdAndDelete(userId);

        if (!deletedUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete user"
        });

    }

};

export default deleteUserController;