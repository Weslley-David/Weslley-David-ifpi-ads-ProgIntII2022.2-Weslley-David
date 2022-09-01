import { NextFunction, Request, Response } from "express"
import { Sequelize } from "sequelize/types";
import { sequelize } from "../database/db";
import { activationcode } from "../database/tables/activationcode";

const User = require('../database/tables/user');
const UserToken = require('../database/tables/userToken')
const jwt = require('jsonwebtoken')
var crypto = require('crypto');
const secret = process.env.SECRET_JWT
const salt = process.env.SALT

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-acess-token']
    const refToken = req.headers['x-refresh-token']
    console.log(refToken)
    console.log(token)
    jwt.verify(token, secret, (err: Error, decoded: any) => {
        if (err) {
            jwt.verify(refToken, secret, (err: Error, decoded: any) => {
                if (err) return res.status(401).end();
            })
        }

        console.log(req)
        req = decoded.id
        console.log(req)
        next();
    })
}

export class AuthController2 {
    public signup = async (req: Request, res: Response) => {
        await sequelize.sync();
        const { email, name, password, phone } = req.body
        var hash = crypto.createHash('md5').update(password + salt).digest('hex');
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (foundUser) {
            return res.status(409).json({ error: "Email em uso." })
        }
        await User.create({
            name: name,
            email: email,
            password: hash,
            phone: phone,
            activated: false
        })

        function getRandomInt() {
            let min = Math.ceil(10000);
            let max = Math.floor(99999);
            return Math.floor(Math.random() * (max - min) + min);
        }

        let randomcode = getRandomInt()
        var dataAtual = new Date();

        console.log("\n\n\n\n", dataAtual, "\n\n\n\n")
        await activationcode.create({
            datacriacao: dataAtual,
            code: randomcode,
            email: email
        })





        return res.status(200).json({ "signup": true, "code": randomcode })
    }


    public activate = async (req: Request, res: Response) => {
        await sequelize.sync();
        const { email, code } = req.body;

        const validator = await activationcode.findOne({
            where: {
                email: email,
                code: code
            }
        })

        var outraData = new Date(validator.datacriacao.get);//2022-09-01T20:35:50.327Z
        
        if(outraData){
            return res.status(201).json({ "err": "código de ativação inválido" })
        }
        console.log(validator.datacriacao)
        return res.status(201).json({ validator })

    }
}
