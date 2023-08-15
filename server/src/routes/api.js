const express = require('express')
const authRouter = require('./auth/authRouter')
const jobsRouter = require('./jobs/jobsRouter')
const auth = require('../middlewares/auth/auth')
const api = express.Router()

api.use('/auth', authRouter)
api.use('/jobs', auth, jobsRouter)

module.exports = {
    api
}