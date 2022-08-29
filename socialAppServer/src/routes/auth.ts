import { Router } from 'express';
import {AuthController } from '../controllers/AuthController'; //AuthController
import { AuthMiddleware } from '../middlewares/authMiddleware';

const router = Router()

//const authController = new AuthController();
const authController = new AuthController();

router.post('/signup', authController.signup)

router.post('/signin', AuthMiddleware, authController.signin)

router.post('/reset-password', AuthMiddleware, authController.reset)

router.post('/me', (req, res)=>{
    res.status(200).json({mensagem:"It's me!"})
})

export default router