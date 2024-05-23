const router = require('express').Router()
const verify = require('./utils/verifyToken')
const tagController = require('../Controllers/tagController')



router.get('/getAlltags', verify.verifyAdmin,tagController.getAllTags)
router.post('/addTag', verify.verifyAdmin, tagController.addTag)



module.exports = router;