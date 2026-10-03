import Room from "../models/admin/facilities/room.js"
export const updateRoomController = async (req, res) => {
    try {
        const { roomId, roomName, capacity, roomType, status ,operatingHours} = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                roomName,
                capacity,
                roomType,
                status,
                operatingHours: {
            start: operatingHours.start,
            end: operatingHours.end
        }
            },
            { returnDocument: "after" }
        );

        return res.status(200).json(updatedRoom);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};