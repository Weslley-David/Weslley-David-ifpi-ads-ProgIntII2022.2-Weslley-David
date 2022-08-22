import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/authMiddleware'

const postRoutes = Router()
const nome = 'Name_of_user'

postRoutes.use(AuthMiddleware)

postRoutes.get('/', (req, res) => res.json({posts: []}))
postRoutes.post('/', (req, res) => res.status(201).json({post: {id: 1, titule: 'Meu Post'}}))

export { postRoutes, nome }