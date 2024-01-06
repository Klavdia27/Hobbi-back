import express from 'express'
import cors from 'cors'
import db from "./db.js";
// import CardAdmin from "./models/cardAdmin.js";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json())

app.get('/', async (req, res) => {
    res.json('Hello world')
})


app.get('/test', async (req, res) => {
    const result = await db.query("SELECT * FROM item")
    console.log(result)

    res.json(result.rows)
})

// app.post('/api/admin-add-card', (req, res) => {
//     CardAdmin.addCard(req.body.data)
// })
//
// app.get('/api/cards', async (req, res) => {
//     const response = await CardAdmin.getCards()
//
//     res.json(response)
// })
//
// app.get('/api/card/:id', async (req, res) => {
//     const response = await CardAdmin.getCard(req.params.id)
//
//     res.json(response)
// })

const PORT = 5000
app.listen(PORT, () => console.log('Работает...'))