const router = require('express').Router()
const productController = require('../Controllers/productController')

router.get('/getAllProduct', productController.getAllProduct) 
router.get('/getProductDetails/:choix_categorie', productController.getProductDetails)
router.post('/getAllProduct/recherche', productController.getAllProductRecherche)
router.post('/getAllProductByCategorie/:choix_categorie', productController.getProductByCategorieWithTags)
router.get('/getProductById/:choix_categorie/:id', productController.getProductById)
router.get('/updateProductById', productController.updateProduct)
router.get('/deleteProductById', productController.deleteProductById)
router.post('/addProduct', productController.addProduct)


module.exports = router;