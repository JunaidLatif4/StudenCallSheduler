const express = require("express");
const uploader = require("../Middleware/multer");

const HeroSectionModal = require("../Models/heroSection")
const PromotionSectionModal = require("../Models/promotionSection")
const FooterSectionModal = require("../Models/footerSection")
const ReviewSectionModal = require("../Models/reviewSection")

const Router = express.Router()

Router.get("/hero", async (req, res) => {
    try {
        const HeroData = await HeroSectionModal.findOne()
        if (HeroData) {
            res.status(200).json({
                message: "HeroSection Data Found",
                data: HeroData
            })
        } else {
            res.status(401).json({
                message: "HeroSection Data not Found",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error at getting HeroSection Data"
        })
    }
})
Router.post("/hero", uploader.single("img"), async (req, res) => {
    let { line1, line2, line3, details } = req.body
    if (req.file) {
        let imgLink = `${req.protocol}://${req.headers.host}/${req.file.path}`
        req.body.img = { link: imgLink }
    } else {
        req.body.img = JSON.parse(req.body.img)
    }
    try {

        const HeroData = new HeroSectionModal(req.body)
        await HeroData.save();

        res.status(200).json({
            message: "HeroSection Data Added Success",
            data: HeroData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding HeroSection Data"
        })
    }
})
Router.patch("/hero/:id", uploader.single("img"), async (req, res) => {
    let { id } = req.params
    if (req.file) {
        let imgLink = `${req.protocol}://${req.headers.host}/${req.file.path}`
        req.body.img = { link: imgLink }
    } else {
        req.body.img = JSON.parse(req.body.img)
    }
    try {

        const HeroData = await HeroSectionModal.findByIdAndUpdate(id, req.body)

        res.status(200).json({
            message: "HeroSection Data Updated Success",
            data: HeroData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating HeroSection Data"
        })
    }
})


Router.get("/promotion", async (req, res) => {
    try {
        const PromotionData = await PromotionSectionModal.findOne()
        if (PromotionData) {
            res.status(200).json({
                message: "PromotionSection Data Found",
                data: PromotionData
            })
        } else {
            res.status(401).json({
                message: "PromotionSection Data not Found",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error at getting PromotionSection Data"
        })
    }
})
Router.post("/promotion", uploader.single("video"), async (req, res) => {
    let { line1, line2, line3, details } = req.body
    if (req.file) {
        let videoLink = `${req.protocol}://${req.headers.host}/${req.file.path}`
        req.body.video = { link: videoLink }
    } else {
        req.body.video = JSON.parse(req.body.video)
    }
    try {
        const PromotionData = new PromotionSectionModal(req.body)
        await PromotionData.save();

        res.status(200).json({
            message: "PromotionSection Data Added Success",
            data: PromotionData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding PromotionSection Data"
        })
    }
})
Router.patch("/promotion/:id", uploader.single("video"), async (req, res) => {
    let { id } = req.params
    if (req.file) {
        let videoLink = `${req.protocol}://${req.headers.host}/${req.file.path}`
        req.body.video = { link: videoLink }
    } else {
        req.body.video = JSON.parse(req.body.video)
    }
    try {
        const PromotionData = await PromotionSectionModal.findByIdAndUpdate(id, req.body)

        res.status(200).json({
            message: "PromotionSection Data Updated Success",
            data: PromotionData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating PromotionSection Data"
        })
    }
})


Router.get("/footer", async (req, res) => {
    try {
        const footerData = await FooterSectionModal.findOne()
        if (footerData) {
            res.status(200).json({
                message: "FooterSection Data Found",
                data: footerData
            })
        } else {
            res.status(401).json({
                message: "FooterSection Data not Found",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error at getting FooterSection Data"
        })
    }
})
Router.post("/footer", async (req, res) => {
    let { instagram, twitter, facebook, linkdin } = req.body
    try {
        const footerData = new FooterSectionModal(req.body)
        await footerData.save();

        res.status(200).json({
            message: "FooterSection Data Added Success",
            data: footerData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding FooterSection Data"
        })
    }
})
Router.patch("/footer/:id", async (req, res) => {
    let { id } = req.params
    try {
        const footerData = await FooterSectionModal.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: "FooterSection Data Updated Success",
            data: footerData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating FooterSection Data"
        })
    }
})


Router.get("/review", async (req, res) => {
    try {
        const reviewData = await ReviewSectionModal.find()
        res.status(200).json({
            message: "ReviewSection Data Found",
            data: reviewData
        })
    } catch (err) {
        res.status(500).json({
            message: "Error at getting ReviewSection Data"
        })
    }
})
Router.post("/review", async (req, res) => {
    try {
        const reviewData = new ReviewSectionModal(req.body)
        await reviewData.save();

        res.status(200).json({
            message: "ReviewSection Data Added Success",
            data: reviewData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Adding ReviewSection Data"
        })
    }
})
Router.patch("/review/:id", async (req, res) => {
    let { id } = req.params
    try {
        const reviewData = await ReviewSectionModal.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: "ReviewSection Data Updated Success",
            data: reviewData
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Updating ReviewSection Data"
        })
    }
})

module.exports = Router