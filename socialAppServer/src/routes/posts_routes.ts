import { Router } from 'express'
import { verifyAcessToken } from '../functions/verifyAcessToken'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const postRoutes = Router()
const nome = 'Rogerio'

postRoutes.use(AuthMiddleware)

postRoutes.get('/', (req, res) => res.json({posts: []}))
postRoutes.post('/', (req, res) => res.status(201).json({post: {id: 1, titule: 'Meu Post'}}))

export { postRoutes, nome }