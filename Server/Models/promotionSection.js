const mongoose = require("mongoose");


const promotionSectionSchema = new mongoose.Schema({
    line1: {
        type: String
    },
    line2: {
        type: String
    },
    line3: {
        type: String,
    },
    details: {
        type: String,
    },
    video:{
        type:String,
    }

}, { timestamps: true });

module.exports = mongoose.model("PromotionSectionModal", promotionSectionSchema)