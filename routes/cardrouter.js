const express = require("express");
const route = express.Router();
const cardModel = require("../models/cardModel");
const { sendResponse } = require("../helper/helper");

route.get("/", async (req, res) => {
    try {
        const result = await cardModel.find()
        if (!result) {
            res.send( sendResponse (false, null, 'Data Not Found')).status(400)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (e) {
        console.log(e)
        res.send(sendResponse(false, null, 'Internal error')).status(400)

    }
});
route.post("/", async (req, res) => {
    
    let {image,id,text,body} = req.body
    let obj = {image,id,text,body}

    if(!image && !id && !text){
        res.send(sendResponse(false,null,"fill all fields" ))
    }else{
        let Card = new cardModel(obj)
        await Card.save() 
        if(!Card){
            res.send(sendResponse(false,null,'Data not send'))
        }else{
            res.send(sendResponse(true,Card))
        }
    }


});
route.put("/:id",async (req, res) => {
    let id = req.params.id
    let result = await cardModel.findById(id)    
    try {
        if(!result){
            res.send(sendResponse(false, null, 'Data Not Found')).status(404)            
        } else {
            let update = await cardModel.findByIdAndUpdate(id,req.body,{
                new:true,
            }) 
            if(!update){
            res.send(sendResponse(false, null, 'Data Not Found')).status(404)                            
            }else{
                res.send(sendResponse(true, update, 'Data Update')).status(200)            
            }
        }
    } catch (e) {
        res.send(sendResponse(false, null, 'Internal Error')).status(400)
    }

});
route.delete("/:id", (req, res) => {});

module.exports = route;