import { Router } from 'express';
import {AuthController2 } from '../controllers/AuthController';

const router = Router()

const authController2 = new AuthController2();

router.post('/signup', authController2.signup)

router.post('/activate', authController2.activate)

router.post('/me', (req, res)=>{
    res.status(200).json({mensagem:"It's me!"})
})

export default router