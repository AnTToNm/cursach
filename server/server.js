const express = require('express')
const app = express()
const PORT = 3001
const cors = require('cors');
const knex = require('./DB/DB')
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.post('/cattle-report', async(req,res,next)=>{
    try{
        await knex('report').insert({
            number: req.body.number,
            data: req.body.data,
            event:req.body.event,
            animal:req.body.animal,
            typeAnimal:req.body.typeAnimal,
            quantity:req.body.quantity,
            measurement:req.body.measurement,
            weight:req.body.weight,
            note:req.body.note
        })
    } catch(e){
        next(e)
    }
})
app.get("/cattle-report", async (req, res) => {
    const report = await knex.withSchema("public")
        .select("*")
        .from("report")
    res.send(report)
})



const start = async () => {
    try {
        app.listen(PORT, () => console.log('Server listening on port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()
