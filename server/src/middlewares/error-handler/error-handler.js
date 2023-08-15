const { StatusCodes } = require('http-status-codes')

const handleValidationError = error => {
    let validationError = {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: Object.values(error)
            .map(e => e.message).join(", ")
    }
    return validationError
}

const handleDefaultError = (error) => {
    let defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || 'Something Went Wrong!'
    }
    return defaultError
}
const handleUniqueEmailError = error => {
    let uniqueEmailError = {
        statusCode: StatusCodes.BAD_REQUEST,
        msg: `${Object.keys(error.keyValue)} already in use`
    }
    return uniqueEmailError

}



const errorHandler = (error, req, res, next) => {
    console.log(error);
    let errorObject = {}
    if (error.name === 'ValidationError') {
        errorObject = handleValidationError(error)
    }
    else if (error.code && error.code === 11000) {
        errorObject = handleUniqueEmailError(error)
    } else {
        errorObject = handleDefaultError(error)
    }

    return res.status(errorObject.statusCode).json({ msg: errorObject.msg })
}

module.exports = errorHandler