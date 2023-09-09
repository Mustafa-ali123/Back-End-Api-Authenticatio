const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter")
const taskRouter = require("./routes/taskRouter");
const cardRouter = require("./routes/cardrouter");
const personRouter = require("./routes/personRouter");
const courseRouter = require("./routes/courseRouter");
const StudentRouter = require("./routes/studentRouter");
const teacherRouter = require("./routes/teacherRouter");
const instituteRouter = require("./routes/instituteRouter");

require("dotenv").config();


const app = express();
app.use(express.json())//Middleware
app.use(cors())


app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);
app.use("/api/task", taskRouter );
app.use("/api/person", personRouter)
app.use("/api/course", courseRouter);
app.use("/api/student", StudentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/institute", instituteRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Database Connected Successfully");
  });
}).catch((err) => {
  console.log(err);
});
