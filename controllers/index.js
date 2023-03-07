const {response } = require('express')
const User = require('../models/user')

module.exports.Controllers = {
    getData: (req, res = response)=>{
        res.json({
            method: 'GET',
            message: 'Welcom to my first node project!'})
    },
    getDataById: (req,res) =>{
        const id = req.params.id
        res.json({
            SearchedId: id,
            name: 'Jose Portillo'
        })
    },
    postData: async(req, res = response)=>{
        const body = req.body

        const user = new User(body)
        await user.save()

        res.json({
            message: 'The user was save in data base',
            user
        })
    },
    putData: (req, res = response)=>{
        const id = req.params.id
        const body = req.body

        res.json({
            method: 'PUT',
            message: 'Welcom to my first node project!',
            description: `The data from ${id} was updated with the next params`,
            body: body,

        })
    },
    deleteDataById: (req, res = response)=>{
        const id = req.params.id

        res.json({
            method: 'DELETE',
            message: 'Welcom to my first node project!',
            description: `The data from ${id} was deleted`
        })
    }
}
