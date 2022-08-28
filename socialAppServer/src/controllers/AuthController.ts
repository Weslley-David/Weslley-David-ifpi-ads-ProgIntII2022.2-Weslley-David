import { NextFunction, Request, Response } from "express"
import { AuthMiddleware } from "../middlewares/authMiddleware";
var db = require('../database/db')
const User = require('../database/tables/user');
const jwt = require('jsonwebtoken')
var crypto = require('crypto');
const secret = process.env.SECRET_JWT
const salt = process.env.SALT

export function verifyJWT(req: Request, res: Response, next: NextFunction){
    const token = req.headers['x-acess-token']
    jwt.verify(token, secret, (err: Error, decoded: any) =>{
        if(err) return res.status(401).end();

        console.log(req)
        req = decoded.id
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
        return res.status(200).json({
            auth : true,
            token
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
        var hash = crypto.createHash('md5').update(newPassword + salt).digest('hex');
        foundUser.password = hash

        await foundUser.save()

        //gerando token após a authenticação
        //const token = jwt.sign({"id": foundUser.id}, secret, {expiresIn: 900})
        /*return res.status(200).json({
            auth : true,
            token
        })*/

        return res.status(201).json({"altered": "true"})
    }
}
