const User = require('../models/user')
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

module.exports.Validations = {
    existEmail,
    existId,
}
            