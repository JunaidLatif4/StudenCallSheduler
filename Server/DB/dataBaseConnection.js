const mongoose = require("mongoose");

const DB_URL = process.env.NODE_ENV == "production" ? process.env.PROD_DB_URL : process.env.DEV_DB_URL;

const connection = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: true,
        });
        console.log("DataBase Connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connection;