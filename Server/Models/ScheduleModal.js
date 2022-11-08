const mongoose = require("mongoose");


const scheduleSchema = new mongoose.Schema({
    name: {
        type: String
    },
    institute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InstituteModal"
    },
    time: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

module.exports = mongoose.model("ScheduleModal", scheduleSchema)