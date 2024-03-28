const router = require('express').Router()
const Controller = require('../controllers/userController')
const { admin } = require('../middlewares/authorization')

router.post('/newStaff', admin, Controller.register)


module.exports = router