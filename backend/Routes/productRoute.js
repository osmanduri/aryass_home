const router = require('express').Router()
const productController = require('../Controllers/productController')

router.get('/getAllProduct', productController.getAllProduct)
router.post('/getAllProductByCategorie/:choix_categorie', productController.getProductByCategorieWithTags)
router.get('/getProductById/:choix_categorie/:id', productController.getProductById)
router.get('/updateProductById', productController.updateProduct)
router.get('/deleteProductById', productController.deleteProductById)
router.post('/addProduct', productController.addProduct)


module.exports = router;