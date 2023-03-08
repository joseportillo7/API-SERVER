const express = require('express')
const { Controllers } = require('../controllers')

const router = express.Router()

router.get('/user/list',Controllers.getUser)
router.get('/user/:id',Controllers.getUserById)
router.post('/user', Controllers.postUser)
router.put('/user/:id',Controllers.putUserById)
router.delete('/user/:id',Controllers.deleteUserById)


module.exports = router;