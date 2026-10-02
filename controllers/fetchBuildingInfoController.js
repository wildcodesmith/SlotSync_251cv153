import Building from "../models/admin/facilities/building.js";
import Room from "../models/admin/facilities/room.js";

export const fetchBuildingInfoController = async (req, res) => {

    try {

        const buildings = await Building.find();

        const buildingData = await Promise.all(
            buildings.map(async (building) => {

                const totalRooms = await Room.countDocuments({
                    building: building._id
                });

                return {
                    buildingId : building._id,
                    buildingName: building.buildingName,
                    buildingType: building.buildingType,
                    totalRooms: totalRooms
                };
            })
        );
 
        return res.status(200).json(buildingData);



    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};