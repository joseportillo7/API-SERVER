const { Schema, model } = require('mongoose') 

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Mandatory field']
    },
    email: {
        type: String,
        required: [true, 'Mandatory field'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Mandatory field']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}

module.exports = model('User', userSchema)