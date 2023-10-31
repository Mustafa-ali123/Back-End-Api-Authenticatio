const express = require('express')
const route = express.Router()
const sirModel = require('../models/sirModel')

route.get("/", async (req, res) => {
    let sirdata = await sirModel.find()
    try{
        if(!sirdata){
            res.send("Data Not Found")
        }else{
            res.send(sirdata)            
        }
    }catch(e){
        console.log(e)
    }
})
route.get("/:id", async (req, res) => {
    let id =req.params.id 
    let sirdata = await sirModel.findById(id)
    try{
        if(!sirdata){
            res.send("Data Not Found")
        }else{
            res.send(sirdata)            
        }
    }catch(e){
        console.log(e)
    }
})
route.post("/", async (req, res) => {
    let errArr=[]
    try {
        let { name, id } = req.body
        if(!name){
            errArr.push("Name is required")
        }if(!id){
            errArr.push("Id is required")            
        }if(errArr.length>0){
            res.send(errArr)
            return;
        }else{
            let obj = {name,id}
            let sir = new sirModel(obj)
            await sir.save()
            if(!sir){
                res.send("Your data is not send").status(400)
            }else{
                res.send(sir).status(200)
            }
        }
    } catch(e) {
        console.log(e)
     }
})
route.put("/:id", async (req, res) => {
    let id =req.params.id
    let result = await sirModel.findById(id)
    try{
        if(!result){
            res.send("data not found")
        }else{
            let upDate = await sirModel.findByIdAndUpdate(id,req.body,{new:true})
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
   let result = await sirModel.findById(id)
    try{
        if(!result){
            res.send("Data not found")
        }else{
            let del =await sirModel.findByIdAndDelete(id) 
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