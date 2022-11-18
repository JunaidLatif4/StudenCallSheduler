const mongoose = require("mongoose");


const scheduleSchema = new mongoose.Schema({
    name: {
        type: String
    },
    institute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InstituteModal"
    },
    totalSeats: {
        type: Number,
        default: 1
    },
    filledSeats: {
        type: Number,
        default: 0
    },
    time: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

module.exports = mongoose.model("ScheduleModal", scheduleSchema)