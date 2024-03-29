const mongoose = require('mongoose')
//Schema for the "game" object in the database
const gameSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Game', gameSchema)