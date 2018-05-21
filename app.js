"use strict";

const express = require("express"),
    bodyParser = require("body-parser");
const ControllerNotify = require("./api/controllers/notify_controller").ControllerNotify;

var app = express();
app.use(bodyParser.json({limit:'1000mb'}));
app.use(bodyParser.urlencoded({limit:'1000mb',extended:true}));
app.enable('trust proxy');//防止ip代理


app.post('/aubitex/notify/eth/btc/all', ControllerNotify.notify);//数据监听

var port = process.env.PORT || 8066;
app.listen(port);
console.log(`listen the port: ${port}`);
module.exports = app;
