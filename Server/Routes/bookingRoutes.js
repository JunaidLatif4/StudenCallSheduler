const express = require("express");
const uploader = require("../Middleware/multer");

const BookingModal = require("../Models/bookingModal")
const ScheduleModal = require("../Models/ScheduleModal")

const Router = express.Router()

Router.get("/", async (req, res) => {
    try {
        const BookingData = await BookingModal.find().populate("user").populate({ path: "shedule", populate: { path: "institute" } })
        res.status(200).json({
            message: "Booking Data Found",
            data: BookingData
        })
    } catch (err) {
        res.status(500).json({
            message: "Error at getting Booking Data"
        })
    }
})
Router.post("/", async (req, res) => {
    try {
        const findSchedule = await ScheduleModal.findById(req.body.shedule)
        if (findSchedule) {
            findSchedule.filledSeats = Number(findSchedule.filledSeats) + 1
            findSchedule.save()
        }
        const BookingData = new BookingModal(req.body)
        await BookingData.save();

        res.status(200).json({
            message: "Booking Data Added Success",
            data: BookingData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding Booking Data"
        })
    }
})
Router.patch("/:id", async (req, res) => {
    let { id } = req.params
    try {
        const BookingData = await BookingModal.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: "Booking Data Updated Success",
            data: BookingData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating Booking Data"
        })
    }
})
Router.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        const BookingData = await BookingModal.findByIdAndDelete(id)
        res.status(200).json({
            message: "Booking Deleted Success",
            data: BookingData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Deleting Booking Data"
        })
    }
})

module.exports = Router;