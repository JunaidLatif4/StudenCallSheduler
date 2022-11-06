const mongoose = require("mongoose");


const heroSectionSchema = new mongoose.Schema({
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
    img:{
        type:String,
    }

}, { timestamps: true });

module.exports = mongoose.model("HeroSectionModal", heroSectionSchema)