const express = require('express')
const { Controllers } = require('../controllers')

const router = express.Router()

router.get('/welcome',Controllers.getData)
router.get('/welcome/:id',Controllers.getDataById)
router.post('/welcome', Controllers.postData)
router.put('/welcome/:id',Controllers.putData)
router.delete('/welcome/:id',Controllers.deleteDataById)


module.exports = router;