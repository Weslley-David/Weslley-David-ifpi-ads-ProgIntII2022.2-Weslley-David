import { Router } from 'express'
import authRoutes from './auth'
import rotas from './core'
import { postRoutes } from './posts_routes'
import tokenRoutes from './token'

const router = Router()

router.use('/auth', authRoutes)
router.use('/core', rotas)
router.use('/posts', postRoutes)
router.use('/token', tokenRoutes)

export default router