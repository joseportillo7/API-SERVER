const {response } = require('express')
const User = require('../models/user')

module.exports.Controllers = {
    getUser: async(req, res = response)=>{
        try {
            const responseUsers = await User.find()
            res.json(responseUsers)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    },
    getUserById: async(req,res) =>{
        try {
            const id = req.params.id
            const responseUserById = await User.findById(id)
            res.json(responseUserById)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})    
        }
    },
    postUser: async(req, res = response)=>{
        try {
            const body = req.body

            const user = new User(body)
            await user.save()

            res.json({
                message: 'The user was save in data base',
                user
            })
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    },
    putUserById: async(req, res = response)=>{
        try {
            const id = req.params.id
            const body = req.body

            const newSchema = {
                name: body.name,
                email: body.email,
                password: body.password,
                image: body.image,
                rol: body.rol,
                state: body.state,
                google: body.state
            }
            
            const data = await User.updateOne({_id: {$eq : id}}, newSchema)
            //const response = await User.findById(id)
            res.json({
                message: 'User updated!'
            })

        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    },
    deleteUserById: async(req, res = response)=>{
        try {
            const id = req.params.id
            await User.deleteOne({_id : { $eq : id}})
            res.json({message:"User deleted"})

        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }

        
    }
}
