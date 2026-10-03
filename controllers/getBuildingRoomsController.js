import Room from "../models/admin/facilities/room.js"
export const getBuildingRoomsController  = async (req,res) => {
     
    try {
        let BuildingRooms = await Room.find({building : req.body.buildingId})

       return res.status(200).json(BuildingRooms)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
 
}