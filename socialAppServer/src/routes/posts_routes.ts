import { Router } from 'express'
import { verifyJWT } from '../controllers/AuthController'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const postRoutes = Router()
const nome = 'Rogerio'

postRoutes.use(AuthMiddleware)

postRoutes.get('/',verifyJWT, (req, res) => res.json({posts: []}))
postRoutes.post('/',verifyJWT, (req, res) => res.status(201).json({post: {id: 1, titule: 'Meu Post'}}))

export { postRoutes, nome }