const express = require('express')
const router = express.Router()
const Game = require('../models/game')

//Get all
router.get('/', async (req, res) => {
    try {
        const games = await Game.find()
        res.send(games)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

//Get one
router.get('/:id', getGame, (req, res) => {
    res.json(res.game)
});

//Create one
router.post('/', async (req, res) => {
    const game = new Game ({
        title: req.body.title,
        release: req.body.release,
        rating: req.body.rating
    })
    try {
        const newGame = await game.save()
        res.status(201).json(newGame)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Edit one
router.patch('/:id', getGame, async (req, res) => {
    if (req.body.title != null) {
        res.game.title = req.body.title
    }
    if (req.body.release != null) {
        res.game.release = req.body.release
    }
    if (req.body.rating != null) {
        res.game.rating = req.body.rating
    }
    try {
        const updatedGame = await res.game.save()
        res.json(updatedGame)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//Delete one
router.delete('/:id', getGame, async (req, res) => {
    try {
        await res.game.deleteOne()
        res.json({message: 'Game removed successfully.'})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getGame(req, res, next) {
    try {
        game = await Game.findById(req.params.id)
        if (game == null) {
            return res.status(404).json({message: 'Cannot find game'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.game = game
    next()
}

module.exports = router