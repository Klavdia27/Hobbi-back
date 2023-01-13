const Router = require('express')
const mongoose = require('mongoose')
const cardSchema = require("./Card");

const router = new Router()

router.get('/card/filter', (req, res) => {
    const cards = mongoose.model('hobby', cardSchema)

    cards.find({section: req.query.section, subsection: req.query.subsection}, null, {},function (err, resu) {
        res.status(200).json(resu)
    });
})


router.get('/cards', (req, res) => {
    const cards = mongoose.model('hobby', cardSchema)

    cards.find({}, null, {},function (err, resu) {
        res.status(200).json(resu)
    });
})

router.get('/card/:id', (req, res) => {
    const cards = mongoose.model('hobby', cardSchema)

    cards.findById(req.params.id, null, {},function (err, resu) {
        res.status(200).json(resu)
    });
})


router.post('/create/card', (req, res) => {
    const card = mongoose.model('hobby', cardSchema)

    const newCard = new card(req.body.data)

    newCard.save()
})

module.exports = router

