import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const token = Router()

token.use(AuthMiddleware)

token.get('/token', (req, res) => res.json({
    "jskdflajslfdj": "fsjlaflsdjh"
}))
token.post('/', (req, res) => res.status(201).json({post: {id: 1, titule: 'Meu Post'}}))

export { token}