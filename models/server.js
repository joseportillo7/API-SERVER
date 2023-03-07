const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.port = process.env.PORT
        this.mainpath = ''
        this.app = express()

        //Middlewares
        this.middlewares()

        //Routes
        this.routes()
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