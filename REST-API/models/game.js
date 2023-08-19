const mongoose = require('mongoose')

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