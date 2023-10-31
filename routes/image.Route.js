let mongoose = require("mongoose")
let express = require("express")
let multer = require("multer")
let path = require("path")
let route = express.Router()

const upload = multer({
    dest:"./upload/Screenshot 2023-08-09 171553.png"
})

route.post("/upload", upload.single("profile"), (req,res)=>{
console.log(req.file)
})

module.exports = route