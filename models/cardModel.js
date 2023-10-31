const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },

})

let cardModel = mongoose.model("Card",cardSchema);
module.exports = cardModel;