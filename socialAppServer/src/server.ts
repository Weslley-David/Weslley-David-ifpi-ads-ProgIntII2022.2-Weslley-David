import express from 'express'
import routes from './routes'
import {LogMiddleware} from './middlewares/logMiddleware'
import { verifyJWT } from './controllers/AuthController';

require("dotenv").config();

const app = express()

app.use(express.json())

app.use(LogMiddleware)

app.get('/', verifyJWT, (req, res)=>{
    res.status(200).json({mensagem:'Pong!'})
})

app.use(routes)

const port = 3007

app.listen(port, () => {
    console.log(`Start at http://localhost:${port} 🚀`)
})