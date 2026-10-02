//Schema for individual room
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
        required: true
    },
    capacity: { type: Number, required: true },
    roomType: { type: String, required: true },
    operatingHours: {
        start: {
            type: String, required: true
        },

        end: {
            type: String, required: true
        }
    },
    status: { type: String, enum: ["available", "unavailable", "maintenance"], default: "available" },


}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
export default Room;
