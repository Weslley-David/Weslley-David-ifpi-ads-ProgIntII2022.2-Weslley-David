import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({mensagem:'Pong!'})
})

app.use(routes)

const port = 3007

app.listen(port, () => {
    console.log(`Start at http://localhost:${port} 🚀`)
})