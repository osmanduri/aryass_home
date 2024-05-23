const router = require('express').Router()
const productController = require('../Controllers/productController')
const verify = require('./utils/verifyToken')

router.get('/getAllProduct', productController.getAllProduct) 
router.get('/getProductDetails/:choix_categorie', productController.getProductDetails)
router.post('/getAllProduct/recherche', productController.getAllProductRecherche)
router.post('/getAllProductByCategorie/:choix_categorie', productController.getProductByCategorieWithTags)
router.get('/getProductById/:choix_categorie/:id', productController.getProductById)
router.put('/updateProductById/:product_id', verify.verifyAdmin, productController.updateProduct)
router.get('/deleteProductById',verify.verifyAdmin, productController.deleteProductById)
router.post('/addProduct',verify.verifyAdmin, productController.addProduct)


module.exports = router;