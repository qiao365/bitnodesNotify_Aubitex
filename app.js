"use strict";

const express = require("express"),
    bodyParser = require("body-parser");
const ControllerNotify = require("./api/controllers/notify_controller").ControllerNotify;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/aubitex/notify/btc/eth/others', ControllerNotify.notify);//导入 keystory

var port = process.env.PORT || 8066;
app.listen(port);
console.log(`listen the port: ${port}`);
module.exports = app;
