const express = require('express')
const mongoose = require('mongoose')
const DB_URI = require('./config.js')
const routerCard = require('./routesCard.js')
const cors = require('cors');



const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json())
app.use('/api', routerCard)

const PORT = 5000

async function startApp() {
    try {
        await mongoose.connect(DB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Работает...'))
    } catch (e) {
        console.log(e)
    }
}


startApp()

