const checkPermissions = (reqUser, resourceUser) => {
    if (reqUser.userId === resourceUser.toString()) return
    throw new Error('Not authorized')
}
module.exports = checkPermissions