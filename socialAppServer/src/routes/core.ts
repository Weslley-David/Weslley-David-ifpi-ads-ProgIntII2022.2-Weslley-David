import { Router } from 'express'

const router = Router()

const feed = 'feed'

router.get('/feed', (req, res)=>{
    res.json({feed})}
)

export default router