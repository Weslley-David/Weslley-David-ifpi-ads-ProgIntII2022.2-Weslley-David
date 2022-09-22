import { Router } from 'express'
import reading from './reading'
import userRoutes from './user'
import activateRoutes from './activate'

const router = Router()

router.use('/user', userRoutes)
router.use('/activate', activateRoutes)
router.use('/reading', reading)

export default router