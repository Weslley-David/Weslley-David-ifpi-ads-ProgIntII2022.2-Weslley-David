import { Router } from 'express'

const feedRoutes = Router()

const feed = 'feed'

feedRoutes.get('/feed', (req, res)=>{
    res.json({feed})}
)

export default feedRoutes