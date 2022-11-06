const express = require("express");
const JWT = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const AppError = require("../Utils/AppError");

const Authrization = require("../Middleware/authenticator")

const UserModal = require("../Models/user");

const Router = express.Router();
const saltRound = 10;


Router.get("/", Authrization, async (req, res) => {
    try {
        res.status(200).json({
            message: "User Found",
            data: req.user
        })
    } catch (err) {
        res.status(500).json({
            message: "Error at Getting UserData",
            err
        })
    }
})

Router.post("/login", async (req, res, next) => {
    let { phone, password } = req.body;
    try {
        let findUser = await UserModal.findOne({ phone: phone }).select("+password")
        if (findUser) {
            let deHash = await Bcrypt.compareSync(password, findUser.password)
            if (!deHash) {
                res.status(402).json({
                    message: "Wrong credentials"
                })
                return
            }
            let token = await JWT.sign({ data: { phone: findUser.phone, _id: findUser._id } }, process.env.JWT_SECRET)
            res.status(200).json({
                message: "Login Success",
                token,
                data: {
                    ...findUser._doc,
                    password: undefined
                }
            });
        } else {
            res.status(404).json({
                message: "User not Found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error at Getting UserData",
            err
        })
    }
})
Router.post("/register", async (req, res) => {
    let { phone, firstName, lastName, password } = req.body;
    try {
        const hasedPass = await Bcrypt.hashSync(password, saltRound)
        const userData = new UserModal({
            phone,
            firstName,
            lastName,
            password: hasedPass
        });
        await userData.save();

        res.status(200).json({
            message: "UserRegister Success",
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Registering User",
            err
        })
    }
})
Router.post("/verify", async (req, res) => {
    let { phone, firstName, lastName, password } = req.body;
    try {
        const hasedPass = await Bcrypt.hashSync(password, saltRound)
        const userData = new UserModal({
            phone,
            firstName,
            lastName,
            password: hasedPass
        });
        await userData.save();

        res.status(200).json({
            message: "UserRegister Success",
        })

    } catch (err) {
        res.status(500).json({
            message: "Error at Registering User",
            err
        })
    }
})

// Router.post("/check", async (req, res) => {
//     let { phone, googleContinue } = req.body;
//     try {
//         let findUser = await UserModal.findOne({ phone: phone })
//         if (findUser) {
//             if (googleContinue) {
//                 let token = await JWT.sign({ data: { email: findUser.email, _id: findUser._id } }, process.env.JWT_SECRET)
//                 res.status(200).json({
//                     message: "Login Success",
//                     registered: true,
//                     token,
//                     data: {
//                         ...findUser._doc,
//                         password: undefined
//                     }
//                 });
//             } else {
//                 res.status(200).json({
//                     message: "User already Exist , please login",
//                     registered: true
//                 })
//             }
//         } else {
//             res.status(200).json({
//                 message: "User not Found",
//                 registered: false
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: "Error at Checking UserData",
//             err
//         })
//     }
// })

module.exports = Router;