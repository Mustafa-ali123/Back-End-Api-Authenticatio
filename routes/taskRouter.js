const express = require('express')
const route = express.Router()
const taskModel = require('../models/taskModel')

route.get("/", async (req, res) => {
    let result = await taskModel.find()
    try{
        if(!result){
            res.send("Data Not Found")
        }else{
            res.send(result)            
        }
    }catch(e){
        console.log(e)
    }
})
route.get("/:id", async (req, res) => {
    let id =req.params.id 
    let result = await taskModel.findById(id)
    try{
        if(!result){
            res.send("Data Not Found")
        }else{
            res.send(result)            
        }
    }catch(e){
        console.log(e)
    }
})
route.post("/", async (req, res) => {
    let errArr=[]
    try {
        let {T_name,date,E_time,S_time } = req.body
        if(!T_name){
            errArr.push("Name is required")
        }if(!date){
            errArr.push("Date required")            
        }if(!S_time){
            errArr.push("start time required")            
        }if(!E_time){
            errArr.push("end time required")            
        }if(errArr.length>0){
            res.send(errArr)
            return;
        }else{
            let obj = {T_name,date,E_time,S_time}
            let result = new taskModel(obj)
            await result.save()
            if(!result){
                res.send("Your data is not send").status(400)
            }else{
                res.send(result).status(200)
            }
        }
    } catch(e) {
        console.log(e)
     }
})
route.put("/:id", async (req, res) => {
    let id =req.params.id
    let result = await taskModel.findById(id)
    try{
        if(!result){
            res.send("data not found")
        }else{
            let upDate = await taskModel.findByIdAndUpdate(id,req.body,{new:true})
            if(!upDate){
                res.send("data not Update")  
            }else{
                res.send(upDate)
            }
        }

    }catch(e){
        console.log(e)
    }
})
route.delete("/:id", async (req, res) => {
   let id = req.params.id 
   let result = await taskModel.findById(id)
    try{
        if(!result){
            res.send("Data not found")
        }else{
            let del =await taskModel.findByIdAndDelete(id) 
            if(!del){
                res.send("data not Deleted")                
            }else{
                res.send("data is Deleted")
            }       
        }
    }catch(e){
        console.log(e)
    }
    
})

module.exports = route;