import express from 'express'
import routes from './routes'
import {LogMiddleware} from './middlewares/log'
import { dbconnection } from './bd/connection'

const app = express()
const port = 3007

dbconnection.sync();

app.use(express.json())

app.use(LogMiddleware)

app.get('/', (req, res)=>{
    res.status(200).json({"message":"Wellcome, see all the methods in: (i will put the url here later)"})
})

app.use(routes)

app.listen(port, () => {
    console.log(`༼ つ ◕_◕ ༽つ Start at http://localhost:${port}`)
})