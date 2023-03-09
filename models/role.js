const { Schema, model } = require('mongoose') 

const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Mandatory field']
    }
})

module.exports = model('Role', roleSchema)