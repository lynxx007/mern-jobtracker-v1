require('dotenv').config()
const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please Provide a Valid Email'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide password'],
        minLength: 6,
        select: false
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'lastName'
    },
    location: {
        type: String,
        trim: true,
        maxLength: 20,
        default: 'My City'
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}
userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}
module.exports = model("User", userSchema)