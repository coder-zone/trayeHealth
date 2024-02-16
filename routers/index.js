const express = require("express");
const router = express.Router();


const user = require("./userRoute");
router.use('/user',user);



const product = require("./productRoute");
router.use('/product',product);
module.exports = router;