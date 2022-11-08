const mongoose = require("mongoose");


const InstituteSchema = new mongoose.Schema({
    name: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model("InstituteModal", InstituteSchema)