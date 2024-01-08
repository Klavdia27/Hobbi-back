import express from 'express'
import cors from 'cors'
import CardAdmin from "./models/cardAdmin.js";
import bodyParser from 'body-parser';
const app = express()
import multer from 'multer';
const storage = multer.diskStorage({
    //Надо еще добавить проверку на является ли файл картинкой.
    destination: function (req, file, cb) {
        return cb(null, 'uploads/') //Здесь указывается путь для сохранения файлов
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname)
    }
});

app.use(bodyParser())

const upload = multer({ storage: storage });

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/uploads', express.static('uploads'));
app.use(express.json())





app.post('/api/admin-add-card',  upload.any(), async (req, res) => {
    const response = await CardAdmin.addCard(req.body, req.files)

    res.json(response)
})

app.get('/api/cards', async (req, res) => {
    const response = await CardAdmin.getCards()

    res.json(response)
})

app.get('/', async (req, res) => {
    res.json('hello')
})

app.get('/api/card/:id', async (req, res) => {
    const response = await CardAdmin.getCard(req.params.id)

    res.json(response)
})

const PORT = 5000
app.listen(PORT, () => console.log('Работает...'))


