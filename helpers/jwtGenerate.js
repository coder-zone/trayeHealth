var jwt = require("jsonwebtoken");
require('dotenv').config();




exports.generateToken = function (data) {
  try {
    let token = jwt.sign(
      { userName: data.userName, userId: data._id },
      (SECRETE_KEY = process.env.JWT_KEY),
      { expiresIn: process.env.JWT_TIMEOUT }
    );
    return token;
  } catch (err) {
    throw { message: err };
  }
};

exports.tokenverify = function (token) {
  try {
    var decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (err) {
    throw { message: err };
  }
};







