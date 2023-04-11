const Usuario = require('../models/user')
const bcryptjs = require('bcryptjs')
const generateJWT = require('../helpers/jwt')


module.exports.auth_Controller = {

    login: async(req, res = response)=>{

        const { email, password } = req.body
        try {
            
            //validate if user exist by email
            const user = await Usuario.findOne({email})
            
            if(!user){
                return res.status(400).json({
                    message: "Email or password incorrect"
                })
            }

            //active user?
            const isActive = user.state
            if(!isActive){
                return res.status(400).json({
                    message: "Inactive username"
                })  
            }

            //validate password
            const isPassValid = bcryptjs.compareSync(password, user.password)
            if(!isPassValid){
                return res.status(400).json({
                    message: "Email or password incorrect"
                })
            }
            
            //generate jwt
            const token = await generateJWT(user.id)

            res.json({
                user,
                token
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    },
}