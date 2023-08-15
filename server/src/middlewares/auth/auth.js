const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        throw new Error('Authentication failed')
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: payload.userId
        }
        next()
    } catch (error) {
        next(error)
    }

}

module.exports = auth