const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.port = process.env.PORT
        this.mainpath = ''
        this.app = express()

        //Connect to database
        this.connectDB()

        //Middlewares
        this.middlewares()

        //Routes
        this.routes()
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){

        //Parse Json application
        this.app.use(express.json())
        
        //Using cors to enable this project
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.mainpath, require('../routes'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server listening on port ${this.port}`);
        })
    }
}

module.exports = Server;