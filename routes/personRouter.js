const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const express = require('express')
const personModel = require('../models/personModel')
const route = express.Router()

route.post('/signup', async (req, res) => {
    let { userName, email, password } = req.body
    let obj = { userName, email, password }
    let requiredField = ['userName', 'email', 'password']
    let errArr = []

    try {
        requiredField.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x)
            }
        });
        if (errArr.length > 0) {
            res.send(errArr).status(400)

        } else {

            let hashPassword = await bcrypt.hash(obj.password, 10)
            obj.password = hashPassword
            let checkEmail = await personModel.findOne({ email })
            console.log(password, hashPassword)
            if (checkEmail) {
                res.send("This Email already exist")
            } else {
                let person = new personModel(obj)
                await person.save()
                if (!person) {
                    res.send("Internal error")
                } else {
                    res.send("Sign Up Sccessfully")
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
})
route.post('/login', async (req, res) => {
    let { email, password } = req.body
    let obj = { email, password }
    try {
        let checking = await personModel.findOne({ email }).then(async (result) => {

                let comparing = await bcrypt.compare(req.body.password, result.password)
                if (comparing) {
                    res.send("Login Sccessfully")
                } else {
                    res.send("Password is Incorrect")
                }
           

        }).catch((e) => console.log(e))
    } catch (e) {
        console.log(e)
    }

})
route.delete("/:id", async (req, res) => {
    let id = req.params.id 
    let result = await personModel.findById(id)
     try{
         if(!result){
             res.send("Data not found")
         }else{
             let del =await personModel.findByIdAndDelete(id) 
             if(!del){
                 res.send("Data not Deleted")                
             }else{
                 res.send("Data is Deleted")
             }       
         }
     }catch(e){
         console.log(e)
     }
     
 }) 
route.get('/', async (req, res) => {
    let result = await personModel.find()
    if (!result) {
        res.send("data not found")
    } else {
        res.send(result)
    }
})
route.get("/:email", async (req, res) => {
    let email =req.params.email 
    let result = await personModel.findOne({email})
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

module.exports = route