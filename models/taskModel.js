// name address shortName tel 
const mongoose = require('mongoose')
const taskschema =new mongoose.Schema({
    T_name:{
        type:String,
        required:true
    }, 
      date:{
        type:String,
        required:true
    },    
    S_time:{
        type:String,
        required:true
    }, 
    E_time:{
        type:String,
        required:true
    },
})
const taskModel =  mongoose.model("task",taskschema)
module.exports=taskModel