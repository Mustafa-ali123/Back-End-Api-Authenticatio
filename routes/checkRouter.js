const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")
const checkmodel = require("../models/checkModel")

let route = express.Router()

let protected = (req,res,next)=>{
    let token = req.headers.authorization
    if(token){
        token = token.split(" ")[1]
        
        jwt.verify(token,process.env.SECURE,(err,decoded)=>{
            if(err){
                res.send(err)
            }else{
                next()
            }
        })
    }else{
        res.send("Token Error")
    }
}
route.get('/', async (req, res) => {
    try {
        let result = await checkmodel.find()
        if (!result) {
            res.send("data not found")
        } else {
            res.send(result)
        }
    } catch (e) {
        console.log(e)
    }
})
route.post("/signup", async (req, res) => {
    let { user, email, password } = req.body
    let obj = { user, email, password }
    let errArrF = ["user", "email", "password"]
    let errArr = []
    try {
        errArrF.forEach((x) => {
            if (!obj[x]) {
                errArr.push(x)
            }
        })
        if (errArr.length > 0) {
            res.send(errArr)
        } else {

            let hashPassword = await bcrypt.hash(password, 10)
            obj.password = hashPassword

            let checkemail = await checkmodel.findOne({ email })
            if (checkemail) {
                res.send("This email already exist").status(403)
            } else {
                let result = new checkmodel(obj)
                await result.save()
                if (!result) {
                    res.send("data not save")
                } else {
                    res.send(result)
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})
route.post("/login", async (req, res) => {

    let { email, password } = req.body
    let obj = { email, password }
    
    let checking = await checkmodel.findOne({ email }).then(async (result) => {
        let compare = await bcrypt.compare(obj.password, result.password)
        // console.log(compare)
            if(compare){
            let token = jwt.sign({result},process.env.SECURE,(err,decoded)=>{
                if(err){
                    res.send("Token not genrated")
                }else{
                    res.send({user: result , auth:decoded })
                }
            })
        }else{
            res.send("This email is not available")
        }
    })

})
route.get("/test",protected,(req,res)=>{
    res.send("User Is Valid")
})
route.delete("/:id", async (req, res) => {
    let id = req.params.id
    try {
        let check = await checkmodel.findById(id)
        if (!check) {
            res.send("Data Not Found")
        } else {
            let result = await checkmodel.findByIdAndDelete(id)
            if (!result) {
                res.send("data not Deleted")
            } else {
                res.send("Data was Deleted")
            }
        }


    } catch (e) {
        console.log(e)
    }
})
route.put("/:id", async (req, res) => {
    let id = req.params.id
    let checkid = await checkmodel.findById(id)

    if (!checkid) {
        res.send("Data not found")
    } else {
        let result = await checkmodel.findByIdAndUpdate(id, req.body, { new: true })

        if (!result) {
            res.send("Internal Error")
        } else {
            res.send(result).status(200)
        }

    }
})

module.exports = route