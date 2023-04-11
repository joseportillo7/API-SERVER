const express = require('express')
const { Controllers } = require('../controllers')
const { check } = require('express-validator')
const { Validations } = require('../helpers/custom-validations')

const router = express.Router()

router.get('/user/list',[

    Validations.validateJWT,

],Controllers.getUser)

router.get('/user/:id', [

    Validations.validateJWT,

    //notEmpty fields
    check('id').notEmpty().withMessage('ID cannot be empty'),

    //Invalid fields
    check('id').isMongoId().withMessage('The id is not a valid MongoId'),

    //Custome validations
    check('id').custom(Validations.existId),

],Controllers.getUserById)

router.post('/user', [

    Validations.validateJWT,

    //notEmpty fields
    check('name','Name is a mandatory field, it cannot be empty').notEmpty(),
    check('email').notEmpty().withMessage('Email is a mandatory field, it cannot be empty'),
    check('password').notEmpty().withMessage('Password is a mandatory field, it cannot be empty'),
    check('role').notEmpty().withMessage('Role is a mandatory field, it cannot be empty'),

    //custom validations
    check('email').custom(Validations.existEmail), //other way -> (email) => Validations.exisEmail(email) is the same
    
    //Invalid fields
    check('email','Invalid email').isEmail(),
    check('role').isIn(["ADMIN_ROLE", "USER_ROLE"]).withMessage('You should use only this roles ADMIN_ROLE or USUER_ROLE')

] ,Controllers.postUser)

router.put('/user/:id',[

    Validations.validateJWT,

    //notEmpty fields
    check('id').notEmpty().withMessage('ID cannot be empty'),
    check('name','Name is a mandatory field, it cannot be empty').notEmpty(),
    check('email').notEmpty().withMessage('Email is a mandatory field, it cannot be empty'),
    check('password').notEmpty().withMessage('Password is a mandatory field, it cannot be empty'),
    check('role').notEmpty().withMessage('Role is a mandatory field, it cannot be empty'),

    //Invalid fields
    check('id').isMongoId().withMessage('The id is not a valid MongoId'),
    check('email','Invalid email').isEmail(),
    check('role').isIn(["ADMIN_ROLE", "USER_ROLE"]).withMessage('You should use only this roles ADMIN_ROLE or USUER_ROLE'),

    //Custom validations
    check('id').custom(Validations.existId),
    check('email').custom(Validations.existEmail),

],Controllers.putUserById)

router.delete('/user/:id',[

    Validations.validateJWT,

    //notEmpty fields
    check('id').notEmpty().withMessage('ID cannot be empty'),
    
    //Invalid fields
    check('id').isMongoId().withMessage('The id is not a valid MongoId'),

    //Custome validations
    check('id').custom(Validations.existId)

],Controllers.deleteUserById)


module.exports = router;