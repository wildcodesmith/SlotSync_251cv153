import Room from "../models/admin/facilities/room.js";

export const filterAdminRoomsController = async (req, res) => {

    try {

        const {buildingId,roomType,status,capacity} = req.body;


        // building filter 
        let filter = {
            building: buildingId
        };


        // room type filter
        if (roomType && roomType !== "all") {

            filter.roomType = roomType;

        }


        // status filter
        if (status && status !== "all") {

            filter.status = status;

        }


        // capacity filter
        if (capacity) {

            filter.capacity = {
                $gte: Number(capacity)
            };

        }


        const rooms =
            await Room.find(filter);


        return res.status(200).json(rooms);

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }

};