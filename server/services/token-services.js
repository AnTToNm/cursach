const knex = require('../DB/db.js');
const jwt = require('jsonwebtoken')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'KzPCSxEqydEtdXiM', {expiresIn: '3h'})
        const refreshToken = jwt.sign(payload, 'frUfFALXBHtRcBAw', {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokens = await knex
            .select('*')
            .from('users')
            .joinRaw('left join user_token as token ON token.userid = users.uid', [])
            .where('userid', userId);

        await tokens.some(async function(currentObject) {
            if (currentObject.token !== 0 || currentObject.token !== undefined || currentObject.token !== '') {
                await knex
                    .select('*')
                    .from('user_token')
                    .where('userid', userId)
                    .update('token', refreshToken);
                return null;
            }
        });

        await knex('user_token').insert({
            userid: userId,
            token: refreshToken,
        });
    }


    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET)
            return userData
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET_REFRESH)
            return userData
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await knex
            .select('*')
            .from('user_token')
            .where('token', refreshToken)
            .del()

        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await knex
            .select('token')
            .from('user_token')
            .where('token', refreshToken)

        return tokenData
    }
}

module.exports = new TokenService()
