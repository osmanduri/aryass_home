const router = require('express').Router()
const tagController = require('../Controllers/tagController')


router.get('/getAlltags', tagController.getAllTags)
router.post('/addTag', tagController.addTag)



module.exports = router;