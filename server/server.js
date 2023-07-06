const express = require('express')
const app = express()
const PORT = 3001
const cors = require('cors');
const knex = require('./DB/DB')
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
const {body, validationResult} = require('express-validator')
const ApiError = require("./exeptions/apiError");
const bcrypt = require('bcrypt')
const userDto = require("./dtos/user-dto");
const tokenService = require('./services/token-services')

app.post('/cattle-otchet', async (req, res, next) => {
    try {
        await knex('otchet').insert({
            animal: req.body.animal,
            data: req.body.data,
            quantity: req.body.quantity,
        })
        res.send("Отчет успешно отправлен!")
    } catch (e) {
        next(e)
    }
})

app.get('/cattle-otchet', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const sortColumn = req.query.column || 'data';
    const sortDirection = req.query.direction || 'asc';

    const offset = (page - 1) * limit;

    const [countResult, reports] = await Promise.all([
        knex.withSchema("public").count("* as count").from("otchet").first(),
        knex.withSchema("public")
            .select("*")
            .from("otchet")
            .orderBy(sortColumn, sortDirection)
            .limit(limit)
            .offset(offset),
    ]);
    const total_pages = Math.ceil(countResult.count / limit);
    res.send({ results: reports, total_pages });
})

app.post('/cattle-report', async (req, res, next) => {
    try {
        await knex('report').insert({
            number: req.body.number,
            data: req.body.data,
            event: req.body.event,
            animal: req.body.animal,
            quantity: req.body.quantity,
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

// Удаление записи из таблицы report
app.delete('/cattle-report/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await knex('report').where('id', id).del();
        res.send('Запись успешно удалена');
    } catch (e) {
        next(e);
    }
})

// Обновление записи в таблице report
app.put('/cattle-report/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { number, data, event, animal, quantity, weight, note } = req.body;
        await knex('report').where('id', id).update({ number, data, event, animal, quantity, weight, note });
        res.send('Запись успешно обновлена');
    } catch (e) {
        next(e);
    }
})

app.post("/registration", body('email').isEmail(), body('password').isLength({
    min: 6, max: 36
}), async (req, res, next) => {
    const users = await knex
        .select('email')
        .from("users")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        }
        const hasDuplicates = await users.some(function (currentObject) {
            return currentObject.email.toLowerCase() === req.body.email;

        })
        if (hasDuplicates) {
            throw ApiError.BadRequest(`Пользователь уже зарегестрирован`)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await knex('users').insert({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        })
        const currentUser = await knex
            .select('email', 'uid')
            .from('users')
            .where('email', req.body.email)
        const userdto = new userDto(currentUser[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e) {
        next(e)
    }
})
app.post("/login", async (req, res, next) => {
    try {
        const user = await knex
            .select("*")
            .from("users")
            .where("email", req.body.email)

        if (!user[0]){
            throw ApiError.BadRequest('Данный пользователь не найден!')
        }
        const PassCompare = await bcrypt.compare(req.body.password, user[0].password)
        if (!PassCompare) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userdto = new userDto(user[0])
        const tokens = tokenService.generateTokens({...userdto})
        await tokenService.saveToken(userdto.id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send({...tokens, user: userdto})
    } catch (e){
        next(e)
    }
})
app.post('/logout', async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        await tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken');
        return res.send('Выход успешен')
    } catch (e) {
        next(e)
    }
})



const start = async () => {
    try {
        app.listen(PORT, () => console.log('Server listening on port: ', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()
