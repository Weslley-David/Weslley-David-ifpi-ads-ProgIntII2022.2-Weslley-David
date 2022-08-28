import { Router } from 'express'
import { verifyJWT } from '../controllers/AuthController'

const feedRoutes = Router()

const feed = 'feed'

feedRoutes.get('/feed', verifyJWT, (req, res)=>{
    res.json({feed})}
)

export default feedRoutes