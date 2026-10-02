//Schema for individual building
import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
    buildingName : {type : String , required : true},
    buildingType : {type : String , requied : true},
})
const Building = mongoose.model('Building' , buildingSchema);
export default Building;