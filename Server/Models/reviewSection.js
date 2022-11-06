const mongoose = require("mongoose");


const reviewSectionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    details: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model("ReviewSectionModal", reviewSectionSchema)