const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()

const DbConnection = require("./DB/dataBaseConnection");
const AppError = require("./Utils/AppError");

const AuthRoute = require("./Routes/authRoutes");

let app = express();



app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan("dev"));

DbConnection();


app.get("/health-check", (req, res) => {
    res.status("200").send("server is up and running");
});

app.use("/api/auth", AuthRoute)

app.all("*", (req, res, next) =>
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
);


let PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server Started at === ", PORT);
})
