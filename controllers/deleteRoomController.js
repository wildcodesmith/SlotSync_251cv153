import Room from "../models/admin/facilities/room.js";

export const deleteRoomController = async (req, res) => {

    try {

        console.log
        const { roomId } = req.body;

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        return res.status(200).json({
            message: "Room deleted successfully",
            room: deletedRoom
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }

};