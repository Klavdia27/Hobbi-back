const Router = require('express')
const mongoose = require('mongoose')
const cardSchema = require("./Card");

const router = new Router()

router.get('/card/filter', (req, res) => {
    const cards = mongoose.model('hobby', cardSchema)

    console.log('sdsd')

    // cards.findById(req.params.id, null, {},function (err, resu) {
    //     //     res.status(200).json(resu)
    //     // });

    res.status(200).json(req.query)
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

    const newCard = new card({
        "name": "Лошадь, зебра, единорог",
        "section": "Вязание для дома",
        "subsection": "Игрушки",
        "description": "Вязаные лошадь, зебра, единорог по одной схеме вязания.",
        "author": "",
        "material": "",
        "conventions": "",
        "link": "",
        "date": "25/11/2022",
        "countcomment": "3",
        "watch": "8",
        "image": "https://1.bp.blogspot.com/-cNUkA1HkRK4/VsdC8JluGZI/AAAAAAAAE4I/zEBfKWjnUjM/s1600/3%25D0%25B8%25D0%25B3%25D1%2580%25D1%2583%25D1%2588%25D0%25BA%25D0%25B8.PNG",
    })

    newCard.save()
})

module.exports = router

