const { verifyToken } = require("../helpers/helper")
const { User } = require('../models')

async function authentication(req, res, next) {
    try {
        
        const access_token  = req.headers.authorization
        
        if(!access_token) throw {name: "unauthenticated"}
        let token = access_token.split(' ')
        token = token[1]
        
        const payload = verifyToken(token)
        const id = payload.id

        const findUser = await User.findByPk(id)
        if(!findUser) throw {name: "unauthenticated"}
    
        req.user = {
            id: findUser.id,
            username: findUser.id,
            email: findUser.email,
            role: findUser.role
        }

        next()
    } catch (error) {
        console.log(error, "<<--- error auth");
        next(error)
    }
}

module.exports = authentication