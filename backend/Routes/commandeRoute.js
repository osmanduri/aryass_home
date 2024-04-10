const router = require('express').Router()
const commandeController = require('../Controllers/commandeController')
const verify = require('./utils/verifyToken')

// Gestion du user
router.get('/getAllCommand', commandeController.getAllCommand);
router.post('/new', commandeController.new)

module.exports = router;