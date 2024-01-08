import db from "../db.js";
import aws from "aws-sdk";
import fs from "fs";
import config from 'dotenv'

config.config()

aws.config.update({
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS,
    accessKeyId: process.env.BUCKET_ACCESS
});

const s3 = new aws.S3();

class CardAdmin {
    async uploadToS3(imageData) {
        const fileName = imageData.filename
        const filePath = imageData.path

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: Date.now() + fileName,
            Body: fs.createReadStream(filePath),
            ContentType: 'image/png',
        };

        try {
            const { Location } = await s3.upload(params).promise();
            return Location;
        } catch (error) {
            console.error('Ошибка при загрузке изображения на S3:', error);
            throw error;
        }
    }

    async addCard(data, files) {
        const image = await this.uploadToS3(files[0]);
        const insFiles = files.slice(1, files.length)
        const arrayOfImages = []
        const result = []

        for (let i = 0; i < insFiles.length; i++) {
            const url = await this.uploadToS3(insFiles[i])

            arrayOfImages.push(url)
        }

        await Promise.all(arrayOfImages)

        for (let i = 0; i < insFiles.length; i++) {
            result.push({title: data.ins_title[i], description: data.ins_description[i], image: arrayOfImages[i]})
        }

        const instruction = `${result?.map(item => `<div><h2>${item.title}</h2><p>${item.description.replaceAll('\n', '<br />')}</p><img src="${item.image}" alt="картинка" /></div>`)}`

        db.query("INSERT INTO card (name, section, subsection, description, short_description, author, material, conventions, instruction, link, image) VALUES($1,$2 ,$3 ,$4 ,$5 ,$6 ,$7 ,$8, $9, $10, $11)", [
            data.name,
            data.section,
            data.subsection,
            data.description,
            data.shortDescription,
            data.author,
            data.material,
            data.conventions,
            instruction,
            data.link,
            image,
        ])

        return 'ok'
    }

    async getCards() {
        return (await db.query("SELECT * from card")).rows;
    }

    async getCard(id) {
        return (await db.query("SELECT * from card WHERE id=$1", [id])).rows[0];
    }
}

export default new CardAdmin()