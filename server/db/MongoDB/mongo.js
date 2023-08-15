require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.log('Error when connecting to MongoDB', error))
}

const mongoDisconnect = async () => {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}