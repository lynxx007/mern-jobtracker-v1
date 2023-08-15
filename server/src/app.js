const express = require('express')
const path = require('path')
const { api } = require('./routes/api')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/error-handler/error-handler')



const app = express()
app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(xss())
app.use(mongoSanitize())
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}


app.use('/v1', api)
app.use(express.static(path.join(__dirname, '..', 'public')))



app.use(errorHandler)


app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = {
    app
}