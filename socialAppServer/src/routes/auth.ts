import { Router } from 'express';
import {AuthController2 } from '../controllers/AuthController'; //AuthController
import { AuthMiddleware } from '../middlewares/authMiddleware';

const router = Router()

//const authController = new AuthController();
const authController2 = new AuthController2();

router.post('/signup', authController2.signup)

router.post('/signin', authController2.signin)

router.post('/reset-password', AuthMiddleware, authController2.reset)

router.post('/me', (req, res)=>{
    res.status(200).json({mensagem:"It's me!"})
})

export default router