const router = require('express').Router()
const Controller = require('../controllers/productController')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', Controller.fetchProducts)
router.post('/', Controller.addProducts)
router.get('/:id', Controller.productById)
router.put('/:id', Controller.editProduct)
router.patch('/:id', upload.single('imgUrl'), Controller.patchImage)
router.delete('/:id', Controller.deleteProduct)

module.exports = router
