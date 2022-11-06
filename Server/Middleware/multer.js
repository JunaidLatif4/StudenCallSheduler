const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/")
    },
    filename: (req, file, cb) => {
        const fileName = `${Math.round(Math.random() * 4000)}-${file.originalname.toLowerCase().split(" ").join("_")}`
        cb(null, fileName)
    }
});

const uploder = multer({
    storage: storage
})

module.exports = uploder;