const {response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const { validationResult } = require('express-validator')

module.exports.Controllers = {

    getUser: async(req, res = response)=>{
        try {   
            const { skip = 0, limit = 10 } = req.query
            const responseUsers = await User.find({state: true}).skip(Number(skip)).limit(Number(limit))
            res.json(responseUsers)
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    },

    getUserById: async(req,res) =>{
        try {
            //Verifying errors form express-validator
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).json(errors)

            //Extract ID from params
            const id = req.params.id

            const result = await User.findById(id, {state: true})

            res.json({
                name: result.name,
                email: result.email,
                role: result.role,
                state: result.state
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})    
        }
    },

    postUser: async(req, res = response)=>{
        try {

            //Verifying errors from express-validator
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).json(errors)

            //Extracting all fields from body
            const {name, email, password, role}= req.body

            const user = new User({name,email,password,role})

            //encrypting password
            const salt = bcryptjs.genSaltSync()//default: 10
            user.password = bcryptjs.hashSync(password, salt)

            //save user into database
            await user.save()

            //sending response
            res.json({
                message: `The user ${user.name} was saved into database`,
            })
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    },
    putUserById: async(req, res = response)=>{
        try {
            //Verifying errors from express-validator
            const erros = validationResult(req)
            if(!erros.isEmpty()) return res.status(400).json(erros)

            //Extracting data from params and body
            const id = req.params.id
            const {name, email, password, role} = req.body

            //encrypting password
            const salt = bcryptjs.genSaltSync()//default: 10
            const passwordencrypted = bcryptjs.hashSync(password, salt)

            const newSchema = {
                name: name,
                email: email,
                password: passwordencrypted,
                role: role,
            }

            await User.updateOne({_id: {$eq : id}}, newSchema)
            
            res.json({
                message: `User with ID:${id} was updated `
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
    },
    deleteUserById: async(req, res = response)=>{
        try {

            //Verifying erros from express-validator
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).json(errors)

            //Extracting data from params
            const id = req.params.id

            /**
             * The first one
             */
            //await User.deleteOne({_id : { $eq : id}})

            /**
             * The second one
             */
            await User.findByIdAndUpdate(id, { state: false})

            res.json({message:`The user with ID: ${id} was deleted`})

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }

        
    }
}
