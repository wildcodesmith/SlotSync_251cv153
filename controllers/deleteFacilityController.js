//adding new building to database and sending it back to browser
import Building from "../models/admin/facilities/building.js";
import Room from "../models/admin/facilities/room.js";

export const deleteFacilityController = async (req, res) => {
    if (!req.body.buildingId) {
        return res.status(400).json({ "message": "Incomplete information. Error delting facility", status: 400 })
    }

    try {

        let newBuilding = await Building.findByIdAndDelete(req.body.buildingId)
        // Delete all rooms belonging to this building
        const deletedRooms =
            await Room.deleteMany({ building: req.body.buildingId });

        return res.status(200).json({
            message: "Facility and associated rooms deleted",
            deletedRooms: deletedRooms.deletedCount
        });



    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};