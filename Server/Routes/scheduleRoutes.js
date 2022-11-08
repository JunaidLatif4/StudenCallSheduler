const express = require("express");
const uploader = require("../Middleware/multer");

const ScheduleModal = require("../Models/ScheduleModal")

const Router = express.Router()

Router.get("/", async (req, res) => {
    try {
        const ScheduleData = await ScheduleModal.find().populate("institute")
        res.status(200).json({
            message: "Schedule Data Found",
            data: ScheduleData
        })
    } catch (err) {
        res.status(500).json({
            message: "Error at getting Schedule Data"
        })
    }
})
Router.post("/", async (req, res) => {
    try {
        const ScheduleData = new ScheduleModal(req.body)
        await ScheduleData.save();

        res.status(200).json({
            message: "Schedule Data Added Success",
            data: ScheduleData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding Schedule Data"
        })
    }
})
Router.patch("/:id", async (req, res) => {
    let { id } = req.params
    try {
        const ScheduleData = await ScheduleModal.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: "Schedule Data Updated Success",
            data: ScheduleData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating Schedule Data"
        })
    }
})
Router.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        const ScheduleData = await ScheduleModal.findByIdAndDelete(id)
        res.status(200).json({
            message: "Schedule Deleted Success",
            data: ScheduleData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Deleting Schedule Data"
        })
    }
})

module.exports = Router;