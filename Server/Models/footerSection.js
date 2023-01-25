const mongoose = require("mongoose");


const footerSectionSchema = new mongoose.Schema({
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String,
    },
    linkdin: {
        type: String,
    },
    apiKey:{
        type:String,
    }

}, { timestamps: true });

module.exports = mongoose.model("FooterSectionModal", footerSectionSchema)