const { StatusCodes } = require('http-status-codes')
const User = require('../../models/user.schema')
const attachCookie = require('../../../utils/attachCookies/attachCookies')
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            throw new Error("Please provide all the values!")
        }
        const user = await User.create({ name, email, password })
        const token = user.createJWT()
        attachCookie(res, token)
        return res.status(StatusCodes.OK).json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name
            },
            location: user.location
        })
    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("Please provide all the values!")
        }
        const user = await User
            .findOne({
                email: email
            }).select('+password')
        if (!user) {
            throw new Error("Email or password incorrect!")
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            throw new Error("Email or password incorrect!")
        }
        const token = user.createJWT()
        attachCookie(res, token)
        user.password = undefined
        return res.status(StatusCodes.OK).json({
            user,
            location: user.location,
        })
    } catch (error) {
        next(error)
    }

}

const updateUser = async (req, res, next) => {
    try {
        const { email, name, lastName, location } = req.body
        if (!email || !name || !lastName || !location) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Provide all values!" })
        }
        const user = await User.findOne({ _id: req.user.userId })
        user.email = email
        user.name = name
        user.lastName = lastName
        user.location = location;
        await user.save()
        const token = user.createJWT()
        attachCookie(res, token)
        return res.status(StatusCodes.OK).json({
            user,
            location
        })
    } catch (error) {
        next(error)
    }
}
const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    return res.status(StatusCodes.OK).json({ user, location: user.location })
}
const logout = async (req, res) => {
    res.cookie('token', {
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'strict'
    })
    return res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

module.exports = {
    register,
    login,
    updateUser,
    getCurrentUser,
    logout
}