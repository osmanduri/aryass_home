const router = require('express').Router()
const userController = require('../Controllers/userController')
const verify = require('./utils/verifyToken')

router.get('/getAllUsers', userController.getAllUsers)
router.post('/addUser', userController.addUser)


module.exports = router;

