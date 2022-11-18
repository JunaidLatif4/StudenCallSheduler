const mongoose = require("mongoose");


const bookingsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModal"
    },
    shedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScheduleModal"
    },
    number:{
        type:String
    }

}, { timestamps: true });

module.exports = mongoose.model("BookingModal", bookingsSchema)