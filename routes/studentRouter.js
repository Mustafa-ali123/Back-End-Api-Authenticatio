const express = require("express");
const { sendResponse } = require("../helper/helper");
const studentModel = require("../models/studentModel");
const studentControl = require('../controllers/studentController') 

const route = express.Router();

route.get("/", studentControl.getstudent)
route.post("/", studentControl.postStudent);
route.put("/:id", studentControl.putStudent)
route.get("/:id", studentControl.getIdStudent);
route.delete("/:id", studentControl.deletStudent);
route.get("/search", studentControl.searchStudent)

module.exports = route;

