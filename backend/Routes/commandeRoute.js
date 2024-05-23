const router = require('express').Router()
const commandeController = require('../Controllers/commandeController')
const verify = require('./utils/verifyToken')

// Gestion du user
router.get('/getAllCommand', verify.verifyAdmin, commandeController.getAllCommand);
router.post('/getCommandByUser/:user_id', verify.verifyUser, commandeController.getCommandByUser)
router.post('/new', verify.verifyAdmin, commandeController.new)

module.exports = router;