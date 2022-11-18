const JWT = require("jsonwebtoken");
const UserModal = require("../Models/user");

const AppError = require("../Utils/AppError");

const authentication = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        } else {
            return next(
                new AppError("Unauthorized Access , Please Login agian", 401)
            )
        }
        const currentUser = JWT.verify(token, process.env.JWT_SECRET);
        console.log(currentUser);
        const findUser = await UserModal.findById(currentUser.data._id)
        if (findUser) {
            req.user = findUser;
        } else {
            return next(
                new AppError("User Not Found", 404)
            )
        }

        next();
    } catch (err) {
        console.log(err);
        return next(
            new AppError("Authentication Error", 500)
        )
    }
};

module.exports = authentication;