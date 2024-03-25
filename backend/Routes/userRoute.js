const router = require('express').Router()
const userController = require('../Controllers/userController')
const verify = require('./utils/verifyToken')

// Gestion du user
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/addUser', userController.addUser);
router.post('/login', userController.signIn);
router.get('/verifyConnected', verify.verifyToken, userController.verifyConnected)
router.get('/verifyIdentify', verify.verifyToken, userController.verifyIsUserOrAdmin)




module.exports = router;

