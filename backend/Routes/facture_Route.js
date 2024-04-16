const router = require('express').Router()
const factureController = require('../Controllers/factureController')
const verify = require('./utils/verifyToken')

router.get('/', factureController.getAllInvoices)
router.post('/convertHandlebarsToPdf', factureController.convertHandlebarsToPdf)

module.exports = router;