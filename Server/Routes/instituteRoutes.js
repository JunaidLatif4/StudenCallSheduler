const express = require("express");
const uploader = require("../Middleware/multer");

const InstituteModal = require("../Models/InstituteModal")

const Router = express.Router()

Router.get("/", async (req, res) => {
    try {
        const InstituteData = await InstituteModal.find()
        res.status(200).json({
            message: "Institute Data Found",
            data: InstituteData
        })
    } catch (err) {
        res.status(500).json({
            message: "Error at getting Institute Data"
        })
    }
})
Router.post("/", async (req, res) => {
    try {
        const InstituteData = new InstituteModal(req.body)
        await InstituteData.save();

        res.status(200).json({
            message: "Institute Data Added Success",
            data: InstituteData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding Institute Data"
        })
    }
})
Router.patch("/:id", async (req, res) => {
    let { id } = req.params
    try {
        const InstituteData = await InstituteModal.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: "Institute Data Updated Success",
            data: InstituteData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating Institute Data"
        })
    }
})
Router.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        const InstituteData = await InstituteModal.findByIdAndDelete(id)
        res.status(200).json({
            message: "Institute Deleted Success",
            data: InstituteData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Deleting Institute Data"
        })
    }
})

module.exports = Router;