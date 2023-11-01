let mongoose = require("mongoose")
let cors = require("cors")
let express = require("express")
let cardrouter = require("./routes/cardrouter")
let instituteRouter = require("./routes/instituteRouter")
let personRouter = require("./routes/personRouter")
let courseRouter = require("./routes/courseRouter")
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


app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/card", cardrouter)
app.use("/api/check", checkRouter)
app.use("/api/person", personRouter)
app.use("/api/course", courseRouter)
app.use("/api/student", studentRouter)
app.use("/api/teacher", teacherRouter)
app.use("/api/institute", instituteRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("MONGODB_CONNECTED")
  })
}).catch((e) => console.log(e))