import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true},

    room: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true},

    building: {type: mongoose.Schema.Types.ObjectId, ref: "Building", required: true},

    date: {type: String, required: true},

    startTime: {type: String, required: true},

    endTime: {type: String, required: true},

    status: {type: String, enum: ["approved", "rejected"], required: true},

    responseMessage: {type: String, default: ""},

    createdAt: {type: Date, default: Date.now},

    respondedAt: {type: Date, default: Date.now}

});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;