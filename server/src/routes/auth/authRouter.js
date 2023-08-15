const express = require('express')
const { logout, register, login, updateUser, getCurrentUser } = require('./authController')
const auth = require('../../middlewares/auth/auth')
const rateLimit = require('express-rate-limit')
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes'
})
const authRouter = express.Router()

authRouter.route('/register')
    .post(apiLimiter, register)

authRouter.route('/login')
    .post(apiLimiter, login)

authRouter.route('/updateUser')
    .patch(auth, updateUser)

authRouter.route('/getCurrentUser')
    .get(auth, getCurrentUser)

authRouter.route('/logout')
    .get(logout)
module.exports = authRouter

