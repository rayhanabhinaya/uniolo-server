const { createToken } = require('../helpers/helper');
const { User } = require('../models')
const bcrypt = require('bcryptjs')

class Controllers {
    static async getUser(req, res) {
        try {
            const user = await User.findAll()
            console.log(user);
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({
                username, email, password
            })
            res.status(201).json({newUser})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({where: {username}})

            if(!user) throw { name: "invalid username" }
            else {
                const passCheck = bcrypt.compareSync(password, user.password)
                if(!passCheck) throw { name: "invalid username" }
                else {
                    const payload = { id: user.id, username: user.username, email: user.email }
                    const token  = createToken(payload)

                    res.status(200).json({ access_token: token })
                }
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controllers