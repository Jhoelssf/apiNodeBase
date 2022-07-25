import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()

const port = process.env.PORT
// Dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log('Servidor corriendo en puerto', port)
})
