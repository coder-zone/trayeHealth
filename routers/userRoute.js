const express = require("express");
const router = express.Router();


const userController = require("../controller/userController");

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login)




module.exports = router;