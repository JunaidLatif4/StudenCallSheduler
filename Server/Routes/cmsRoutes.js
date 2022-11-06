const express = require("express");
const uploader = require("../Middleware/multer");

const HeroSectionModal = require("../Models/heroSection")
const PromotionSectionModal = require("../Models/promotionSection")
const FooterSectionModal = require("../Models/footerSection")

const Router = express.Router()

Router.get("/cms/hero", async (req, res) => {
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
Router.post("/cms/hero", uploader.single("img"), async (req, res) => {
    let { line1, line2, line3, details } = req.body
    try {

        const HeroData = new HeroSectionModal({
            line1,
            line2,
            line3,
            details,
            img: req.file.path
        })

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
Router.patch("/cms/hero", uploader.single("img"), async (req, res) => {
    let { line1, line2, line3, details } = req.body
    try {

        const HeroData = new HeroSectionModal({
            line1,
            line2,
            line3,
            details,
            img: req.file.path
        })

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


Router.get("/cms/promotion", async (req, res) => {
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
Router.post("/cms/promotion", uploader.single("vid"), async (req, res) => {
    let { line1, line2, line3, details } = req.body
    try {
        const PromotionData = new PromotionSectionModal({
            line1,
            line2,
            line3,
            details,
            img: req.file.path
        })

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
Router.patch("/cms/promotion", uploader.single("vid"), async (req, res) => {
    let { line1, line2, line3, details } = req.body
    try {
        const PromotionData = new PromotionSectionModal({
            line1,
            line2,
            line3,
            details,
            img: req.file.path
        })

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


Router.get("/cms/footer", async (req, res) => {
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
Router.post("/cms/footer", async (req, res) => {
    let { instagram, twitter, facebook, linkdin } = req.body
    try {
        const footerData = new FooterSectionModal({
            instagram,
            twitter,
            facebook,
            linkdin,
        })

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
Router.patch("/cms/footer:id", uploader.single("vid"), async (req, res) => {
    let { id } = req.params
    try {
        const footerData = await FooterSectionModal.findById(id, req.body)
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