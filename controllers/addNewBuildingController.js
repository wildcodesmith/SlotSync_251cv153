//adding new building to database and sending it back to browser
import Building from "../models/admin/facilities/building.js";

export const addNewBuildingControllerFunc = async (req, res) => {
    if(!req.body.buildingName || !req.body.buildingType){
        return res.status(400).json({"message" : "Incomplete information", status : 400})
    }
    
    try {

        let newBuilding = await Building.insertOne(req.body)

        const buildingData = {
                    buildingId : newBuilding._id.toString(),
                    buildingName: newBuilding.buildingName,
                    buildingType: newBuilding.buildingType,
                    totalRooms : 0
               
        }
        return res.status(200).json(buildingData);




    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};