// const mongoose = require("mongoose");
const Joi = require("joi");
const md5 = require('md5');
const JWT = require("../helpers/jwtGenerate");
const USER = require('../models/userModel');


// user sign up 
exports.signUp = async (req, res) => {
    try {
        let validation = Joi.object().keys({
            userName: Joi.string().required(),
            password: Joi.string().required(),
        });
        let result = validation.validate(req.body, { abortEarly: false });
        if (result.error) {
            let data = result.error.details[0].message.replace(
                /[."*+\-?^${}()|[\]\\]/g,
                ""
            );
            throw { message: data }

        }
        const findUser = await USER.findOne({ userName: result.value.userName })
        if (findUser) {
            throw { message: "user already registerd" };
        }
        let user = new USER({
            userName: result.value.userName,
            password: md5(result.value.password),
        })
        await user.save();
        res.status(200).json({ message: "user created successfully" });
    } catch (err) {
        res.status(400).json({ err: err.message });

    }
}

// login user
exports.login = async (req, res) => {
    try {
        let validation = Joi.object().keys({
            userName: Joi.string().required(),
            password: Joi.string().required(),
        });
        let result = validation.validate(req.body, { abortEarly: false });
        if (result.error) {
            let data = result.error.details[0].message.replace(
                /[."*+\-?^${}()|[\]\\]/g,
                ""
            );
            throw { message: data };
        }
        const userData = await USER.findOne({ userName: result.value.userName })
        if (!userData) {
            throw { message: "no user found" }
        }
        if (userData.password !== md5(result.value.password)) {

            throw { message: "wrong password" };

        }
        const token = JWT.generateToken(userData);
        let obj = {
            token: `Bearer ${token}`,
            userName: userData.userName,
        }
        res.status(200).json({ message: "success", data: obj });

    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

// as per as discuss with tippu i am skipping reset-password route 



