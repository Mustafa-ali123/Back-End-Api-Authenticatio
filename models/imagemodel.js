let mongoose = require("mongoose")

let imageScheme = new mongoose.Schema({
    
    image:{
        type:String,
        require:true
    }
})

let imageModule = mongoose.model("images",imageScheme)