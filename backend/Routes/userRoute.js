const router = require('express').Router()
const userController = require('../Controllers/userController')
const panierController = require('../Controllers/panierController');
const verify = require('./utils/verifyToken')

// Gestion du user
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/addUser', userController.addUser);
router.post('/login', userController.signIn);
router.get('/verifyConnected', verify.verifyToken, userController.verifyConnected)
router.get('/verifyIdentify', verify.verifyToken, userController.verifyIsUserOrAdmin)


// Gestion du panier
router.post('/panier/add/:id', panierController.addBasket);
router.post('/panier/incrementer/:id', panierController.increaseBasket);
router.post('/panier/decrementer/:id', panierController.decreaseBasket);
router.post('/panier/remove/:id', panierController.removeBasket);
router.delete('/panier/viderPanier/:id',panierController.viderPanier);


module.exports = router;

