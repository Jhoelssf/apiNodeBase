import express from 'express'
import cors from 'cors'
import { router } from '../routes/users.js'
import { authRouter } from '../routes/auth.js'
import { dbConnection } from '../database/config.js'
export class ServerRest {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutesPath = '/api/users'
        this.authRouterPath = '/api/auth'

        //connect to db
        this.connectDB()

        // Middlewares
        this.middlewares()

        // app Routes

        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        // Read and Parse request body
        this.app.use(express.json())

        // Public directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authRouterPath, authRouter)
        this.app.use(this.usersRoutesPath, router)
    }

    startListen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

// module.exports = {
//     ServerRest,
// }
