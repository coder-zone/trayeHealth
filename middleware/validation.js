const createError = require('http-errors');
const JWT = require("../helpers/jwtGenerate");
const USER = require('../models/userModel');

module.exports = async (req, res, next) => {
    if (req && req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            try {
                const decoded = JWT.tokenverify(token);
                req.userData = decoded;
                const userId = req.userData.userId;
                const checkUser = await USER.findById(userId);
                if (!checkUser) {
                    throw { message: "user not valid" };
                }
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "auth failed"
                });
            }
        } else {
            return next(createError(401));
        }
    } else {
        return next(createError(401));
    }

}