//function to insert *room document in mongodb
import Room from "../models/admin/facilities/room.js";

export const addRoomController = async (req, res) => {
  console.log("ADD RO ");
    try {

        const {building,roomName,capacity,roomType,status,operatingHours} = req.body;

        const newRoom = await Room.create({
            building: building,
            roomName: roomName,
            capacity: capacity,
            roomType: roomType,
            status: status,
            operatingHours: {
                start: operatingHours.start,
                end: operatingHours.end
            }
        });
          

        console.log("New room:", newRoom);

        return res.status(201).json(newRoom);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
