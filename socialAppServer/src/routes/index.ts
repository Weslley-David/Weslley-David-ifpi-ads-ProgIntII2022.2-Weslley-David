import { Router } from 'express'
import authRoutes from './auth'
import rotas from './core'
import { postRoutes } from './posts_routes'
import { token } from './token'

const router = Router()

router.use('/auth', authRoutes)
router.use('/core', rotas)
router.use('/posts', postRoutes)
router.use('/token', token)

export default router