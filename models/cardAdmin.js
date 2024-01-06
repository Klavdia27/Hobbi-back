import db from "../db.js";


class CardAdmin {
    addCard(data) {
        console.log(11)

        db.query("INSERT INTO card (name, section, subsection, description_long, description_short, author, material, conventions, instruction, link, image) VALUES(?,? ,? ,? ,? ,? ,? ,?, ?, ?, ?)", [
            data.name,
            data.section,
            data.subsection,
            data.description,
            data.shortDescription,
            data.author,
            data.material,
            data.conventions,
            data.instruction,
            data.link,
            data.image,
        ])
    }

    async getCards() {
        return await new Promise((resolve, reject) => {
            db.all(
                "SELECT * from card",
                (err, rows) => {
                    resolve(rows);
                },
            );
        });
    }

    async getCard(id) {
        return await new Promise((resolve, reject) => {
            db.get(
                "SELECT * from card WHERE id = ?", [id],
                (err, rows) => {
                    resolve(rows);
                },
            );
        });
    }
}

export default new CardAdmin()