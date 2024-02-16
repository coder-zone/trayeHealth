const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const db = require("./connection/db");



app.use(bodyParser.json({
  limit: '50mb',
  extended: true
}));


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on PORT` + " " + port);
});
app.use(cors());
app.use(function (err, req, res, next) {

  //logger.error(err);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(err.status || 500);
  res.send('Invalid API Request ');
});

// router initialize 
const indexRouter = require("./routers/index")
app.use('/api',indexRouter);
