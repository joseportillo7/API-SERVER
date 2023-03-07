const express = require('express')

class Server {
    constructor(){
        this.port = process.env.PORT
        this.app = express()

        this.routes()
    }

    routes(){
        this.app.get('/welcome',(req,res)=>{
            res.send(`Welcome to my first node project!`)
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server listening on port ${this.port}`);
        })
    }
}

module.exports = Server;