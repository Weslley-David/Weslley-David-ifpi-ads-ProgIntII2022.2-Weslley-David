import { Router } from 'express'
import { verifyAcessToken } from '../functions/verifyAcessToken'

const feedRoutes = Router()

const feed = 'feed'

feedRoutes.get('/feed', verifyAcessToken, (req, res)=>{
    res.json({feed})}
)

export default feedRoutes