const mongoose = require('mongoose')

let perSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true
    },    
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }

})

let personModel = mongoose.model('person', perSchema)
module.exports = personModel