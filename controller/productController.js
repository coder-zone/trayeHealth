// const mongoose = require("mongoose");
const Joi = require("joi");
const md5 = require('md5');
const JWT = require("../helpers/jwtGenerate");
const PRODUCT = require('../models/product');
const USER = require('../models/userModel');


// add product
exports.addproduct = async (req, res) => {
    try {
        let validation = Joi.object().keys({
            SKU: Joi.string().uppercase().required(),
            productName: Joi.string().required(),
            productDesc: Joi.string().required(),
            price: Joi.number().required(),
        });
        let result = validation.validate(req.body, { abortEarly: false });
        if (result.error) {
            let data = result.error.details[0].message.replace(
                /[."*+\-?^${}()|[\]\\]/g,
                ""
            );
            throw { message: data };
        }
        const userId = req.userData.userId;
        const checkSKU = await PRODUCT.findOne({ SKU: result.value.SKU })
        if (checkSKU) {
            throw { message: "SKU already taken" };
        }
        let product = new PRODUCT({
            SKU: result.value.SKU,
            price: result.value.price,
            userId: userId,
            productName: result.value.productName,
            productDesc: result.value.productDesc,
        })
        await product.save();
        res.status(200).json({ message: "product create successfully" })

    } catch (err) {
        res.status(400).json({ err: err.message });
    }


}

// allProducts list
exports.allProducts = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const products = await PRODUCT.find({ userId: userId, isActive: true });
        res.status(200).json({ message: "success", data: products });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

// retrieveProduct
exports.retrieveProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userData.userId;
        const products = await PRODUCT.findOne({ userId: userId, isActive: true, _id: productId });
        res.status(200).json({ message: "success", data: products });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

// update products
exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userData.userId;
        const updatedProduct = req.body;
        const result = await PRODUCT.updateOne({ _id: productId, userId }, { $set: updatedProduct });
        res.status(200).json({ message: "update success" });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}


// update products
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userData.userId;
        const result = await PRODUCT.updateOne({ _id: productId, userId }, { $set: { isActive: false } });
        res.status(200).json({ message: "delete success" });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}

