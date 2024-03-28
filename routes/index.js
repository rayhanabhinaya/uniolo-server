const router = require('express').Router()
const products = require('./productRoutes')
const userController = require('../controllers/userController')
const authentication  = require('../middlewares/authentication')
const userAdmin = require('../routes/userRouter')

router.post('/login', userController.login)

router.use(authentication)

router.use('/products', products)
router.use('/user', userAdmin)

module.exports = router