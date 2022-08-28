import { NextFunction, Request, Response } from "express"
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { generateNewToken } from "./gerenareNewToken";
var db = require('../database/db')
const User = require('../database/tables/user');
const UserToken = require('../database/tables/userToken')
const jwt = require('jsonwebtoken')
var crypto = require('crypto');
const secret = process.env.SECRET_JWT
const salt = process.env.SALT

export function verifyJWT(req: Request, res: Response, next: NextFunction){
    const token = req.headers['x-acess-token']
    const refToken = req.headers['x-refresh-token']
    console.log(refToken)
    console.log(token)
    jwt.verify(token, secret, (err: Error, decoded: any) =>{
        if(err){
            jwt.verify(refToken, secret, (err: Error, decoded: any) =>{
                if(err) return res.status(401).end();
                generateNewToken(refToken)
            })
        }

        console.log(req)
        req = decoded.id
        console.log(req)
        next();
    })
}

export class AuthController2{
    public signup = async (req: Request, res: Response) => {
        await db.sync();
        const {email, name, password} = req.body
        var hash = crypto.createHash('md5').update(password + salt).digest('hex');
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (foundUser){
            return res.status(409).json({error: "Email em uso."})
        }
    
        // save into db
        const result = await User.create({
            name: name,
            email: email,
            password: hash
        })
    
        return res.status(200).json({"signup": true })
    }

    public signin = async (req: Request, res: Response) => {
        await db.sync();
        const {email, password} = req.body
        var hash = crypto.createHash('md5').update(password + salt).digest('hex');
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })
        if(foundUser == null){
            return res.status(400).json("usuário não encontrado")
        }
        if(foundUser.password != hash){
            return res.status(401).json("senha incorreta")
        }
        

        //gerando token após a authenticação
        const token = jwt.sign({"id": foundUser.id}, secret, {expiresIn: 900})
        const reftoken = jwt.sign({"id": foundUser.id}, secret, {expiresIn: "3d"})

        //salvando reftoken no banco de dados
        const result = await UserToken.create({
            uid: foundUser.id,
            refToken: reftoken
        })

        console.log(result)
        //retornando tokens ao usuário
        return res.status(200).json({
            auth : true,
            token,
            reftoken
        })
    }

    public reset = async (req: Request, res: Response) => {
        await db.sync();
        const {email, password, newPassword} = req.body
        var hash = crypto.createHash('md5').update(password + salt).digest('hex');
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })
        if(foundUser == null){
            return res.status(400).json("usuário não encontrado")
        }
        if(foundUser.password != hash){
            return res.status(401).json("senha incorreta")
        }
        if(newPassword.length < 6){
            return res.json("a senha deve ter no mímimo 7 caracteres")
        }
        let loop: number = newPassword.length
        let maiusc: boolean = false
        let special: boolean = false
        while(loop >= 0){
            if(newPassword.charCodeAt(loop) > 64 && newPassword.charCodeAt(loop) < 91){
                maiusc = true
            }
            if(newPassword.charCodeAt(loop) > 31 && newPassword.charCodeAt(loop) < 65){
                special = true
            }
            loop--
        }
        if(!special || !maiusc){
            return res.json("a senha deve ter no mímimo um caractere maiúsculo e um número ou caractere especial")
        }
        var hash = crypto.createHash('md5').update(newPassword + salt).digest('hex');

        if(foundUser.password === hash){
            return res.json("a senha não pode ser igual a senha anterior")
        }
        foundUser.password = hash

        await foundUser.save()

        return res.status(201).json({"altered": "true"})
    }
}
