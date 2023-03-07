const express = require('express')
const { Controllers } = require('../controllers')

const router = express.Router()

router.get('/',Controllers.getData)
router.get('/:id',Controllers.getDataById)
router.post('/', Controllers.postData)
router.put('/:id',Controllers.putData)
router.delete('/:id',Controllers.deleteDataById)


module.exports = router;