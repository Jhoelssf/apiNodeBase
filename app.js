import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import { fileURLToPath } from 'url'
import { ServerRest } from './models/server.js'

// Dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = new ServerRest()

server.startListen()
