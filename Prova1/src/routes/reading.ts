import { Router } from 'express'
import { ReadingContoller } from '../controllers/ReadingController'
//import { verifyJWT } from '../controllers/AuthController'

const router = Router()
const reading = new ReadingContoller();

router.post('/add', reading.add)

router.get('/list', reading.list)

router.delete('/delete', (req, res)=>{
    res.json({"delete": true})}
)

router.patch('/status', (req, res)=>{
    res.json({"status": true})}
)

router.patch('/like', (req, res)=>{
    res.json({"like": true})}
)

export default router