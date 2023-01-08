const {Schema} = require("mongoose");

const cardSchema = new Schema({
    name: String,
    section: String,
    subsection: String,
    description: String,
    author: String,
    material: String,
    conventions: String,
    instruction: [
        {
            title: String,
            description: String,
            image: String,
        }
    ],
    link: String,
    date: String,
    countcomment: String,
    watch: String,
    image: String,
})

module.exports = cardSchema