const jwt = require('jsonwebtoken')
const { SECRET } = process.env

function createToken(payload) {
    return jwt.sign(payload, SECRET)
}

function verifyToken(payload) {
    return jwt.verify(payload, SECRET)
}

module.exports = { createToken, verifyToken }