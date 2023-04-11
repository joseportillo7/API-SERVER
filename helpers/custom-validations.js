const {response , request} = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


//Validating if email exist
const existEmail = async(email = '') => {
    const existemail = await User.findOne({email})
    if(existemail) throw new Error(`The email ${email} has already been registered`)
}


//Validating if ID exist
const existId = async(id) => {

    const existid = await User.findOne({_id : { $eq : id}})

    if(!existid) throw new Error(`The ID: ${id} does not exist into database`)
}

//validating jwt
const validateJWT = (req = request, res= response, next) =>{
    const token = req.header('apitoken')

    if(!token){
        return res.status(401).json({
            message: "You must send a token"
        })
    }

    try {
        jwt.verify(token, process.env.SECRETKEY)
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token'
        })  
    }
}

module.exports.Validations = {
    existEmail,
    existId,
    validateJWT, 
}
            