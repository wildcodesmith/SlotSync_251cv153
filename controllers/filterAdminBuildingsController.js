import Building from "../models/admin/facilities/building.js";
import Room from "../models/admin/facilities/room.js";

export const filterAdminBuildingsController = async (req, res) => {
    let buildings;
    try {
        if(req.body.facilityType == "all"){
          buildings = await Building.find();
        }else { 

             buildings = await Building.find({"buildingType" : req.body.facilityType});
        }

       

        const buildingData = await Promise.all(
            buildings.map(async (building) => {

                const totalRooms = await Room.countDocuments({
                    building: building._id
                });

                return {
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