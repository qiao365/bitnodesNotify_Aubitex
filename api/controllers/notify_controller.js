"use strict";

const keystoryModel = require("../models/notify.model");
var ControllerNotify = module.exports;

ControllerNotify.notify = function notify(req, res) {
    let tsc = req.body;
    keystoryModel.notify(tsc).then((data) => {
        res.status(200);
        res.json(data);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
};

module.exports.ControllerNotify = ControllerNotify;