require('dotenv').config()
const http = require("http")
const { app } = require('./app')
const { mongoConnect } = require('../db/MongoDB/mongo')
const processJsonFile = require('../utils/processJsonFile/processJsonFile')


const server = http.createServer(app)

const startServer = async () => {
    await mongoConnect()
    // await processJsonFile()
    server.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}...`);
    })
}

startServer()