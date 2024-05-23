const router = require('express').Router()
const userController = require('../Controllers/userController')
const verify = require('./utils/verifyToken')

// Gestion du user
router.get('/getAllUsers', verify.verifyAdmin, userController.getAllUsers);
router.get('/getUserById/:user_id', verify.verifyUser, userController.getUserById);
router.post('/addUser', verify.verifyAdmin,userController.addUser);
router.post('/login', userController.signIn);
router.get('/verifyConnected', verify.verifyToken, userController.verifyConnected)
router.get('/verifyIdentify', verify.verifyToken, userController.verifyIsUserOrAdmin)

router.put('/updateUserById/:user_id', verify.verifyUser, userController.updateUser)
router.put('/updateEmail/:user_id', verify.verifyUser, userController.updateEmail)
router.put('/updatePassword/:user_id', verify.verifyUser, userController.updatePassword)



module.exports = router;

