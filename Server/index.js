const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()

const DbConnection = require("./DB/dataBaseConnection");
const AppError = require("./Utils/AppError");

const AuthRoute = require("./Routes/authRoutes");
const CMSRoute = require("./Routes/cmsRoutes");
const InstituteRoute = require("./Routes/instituteRoutes");
const ScheduleRoute = require("./Routes/scheduleRoutes");
const BookingRoute = require("./Routes/bookingRoutes");

let app = express();



app.use(express.json());
app.use("/public", express.static("public"))
app.use(cors({
    origin: "*"
}));
app.use(morgan("dev"));

DbConnection();


app.get("/health-check", (req, res) => {
    res.status("200").send("server is up and running");
});

app.use("/api/auth", AuthRoute)
app.use("/api/cms", CMSRoute)
app.use("/api/institute", InstituteRoute)
app.use("/api/schedule", ScheduleRoute)
app.use("/api/booking", BookingRoute)

app.all("*", (req, res, next) =>
    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
);


let PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server Started at === ", PORT);
})
