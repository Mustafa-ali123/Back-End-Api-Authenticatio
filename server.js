let mongoose = require("mongoose")
let cors = require("cors")
let express = require("express")
let cardrouter = require("./routes/cardrouter")
let instituteRouter = require("./routes/instituteRouter")
let personRouter = require("./routes/personRouter")
let studentRouter = require("./routes/studentRouter")
let taskRouter = require("./routes/taskRouter")
let teacherRouter = require("./routes/teacherRouter")
let todoRoute = require("./routes/todoRoute")
let userRouter = require("./routes/userRouter")
let checkRouter = require("./routes/checkRouter")


require("dotenv").config()

let app = express()

app.use(express.json())
app.use(cors())


app.use("/", userRouter)
app.use("/", personRouter)
app.use("/", taskRouter)
app.use("/", todoRoute)
app.use("/", cardrouter)
app.use("/", teacherRouter)
app.use("/", studentRouter)
app.use("/", checkRouter)
app.use("/", instituteRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("MONGODB_CONNECTED")
  })
}).catch((e) => console.log(e))