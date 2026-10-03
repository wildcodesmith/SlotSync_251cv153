import mongoose from "mongoose";

const pendingNotificationSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true},

    room: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true},

    building: {type: mongoose.Schema.Types.ObjectId, ref: "Building", required: true},

    date: {type: String, required: true},

    startTime: {type: String, required: true},

    endTime: {type: String, required: true},

    createdAt: {type: Date, default: Date.now}

});

const PendingNotification = mongoose.model("PendingNotification", pendingNotificationSchema);

export default PendingNotification;

