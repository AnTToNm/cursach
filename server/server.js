const express = require('express')
const app = express()
const PORT = 3001
const cors = require('cors');
const knex = require('./DB/DB')
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.post('/cattle-report', async (req, res, next) => {
    try {
        await knex('report').insert({
            number: req.body.number,
            data: req.body.data,
            event: req.body.event,
            animal: req.body.animal,
            typeAnimal: req.body.typeAnimal,
            quantity: req.body.quantity,
            measurement: req.body.measurement,
            weight: req.body.weight,
            note: req.body.note
        })
        res.send("Отчет успешно отправлен!")
    } catch (e) {
        next(e)
    }
})
app.get("/cattle-report", async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sortColumn = req.query.column || 'data';
    const sortDirection = req.query.direction || 'asc';

    const offset = (page - 1) * limit;

    const [countResult, report] = await Promise.all([
        knex.withSchema("public").count("* as count").from("report").first(),
        knex.withSchema("public")
            .select("*")
            .from("report")
            .orderBy(sortColumn, sortDirection)
            .limit(limit)
            .offset(offset),
    ]);

    const total_pages = Math.ceil(countResult.count / limit);
    res.send({ results: report, total_pages });
});




const start = async () => {
    try {
        app.listen(PORT, () => console.log('Server listening on port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()
