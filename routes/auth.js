const express = require('express')
const { auth_Controller } = require('../controllers/auth')
const { check } = require('express-validator')
const { Validations } = require('../helpers/custom-validations')

const router = express.Router()

router.post('/login',auth_Controller.login)

module.exports = router;
