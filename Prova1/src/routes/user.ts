import { Router } from 'express';
import { UserContoller } from '../controllers/UserController';

const router = Router()
const user = new UserContoller();
router.post('/signup', user.signup)

router.post('/signin', user.signin)

router.post('/setphone', async(req, res)=>{
    res.json({
        "setphone": true
    })
})

router.post('/generatetokens', async(req, res)=>{
    res.json({
        "reftoken": true
    })
})

export default router