// let mongoose = require("mongoose")
// let express = require("express")
// let cors = require("cors")
// // let app = express.Router()

// require("dotenv").config()

// let app = express()
// app.use(express.json())
// app.use(cors())
// app.use("",)

// app.listen(process.env.PORT,()=>{
//   console.log("Listning")
// })


// let mongoose = require("mongoose")
let express = require("express")
let multer = require("multer")
let path = require("path")
let app = express()

const upload = multer({
    dest:"./upload/images"
})
app.get("/upload")
app.post("/upload", upload.single("profile"), (req,res)=>{
console.log(req.file)
})

app.listen(5000 ,()=>{
  console.log("Listning")
})
