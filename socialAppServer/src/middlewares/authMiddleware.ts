import { NextFunction, Request, Response } from "express";
import { searchByEmail } from "../functions/searchByEmail";
var crypto = require('crypto');
const User = require('../database/tables/user');
const UserToken = require('../database/tables/userToken');
var salt = process.env.SALT


export async function AuthMiddleware(request: Request, response: Response, next: NextFunction){

        const auth = request.headers.authorization

        if (!auth){
            return response.status(401).json('Crendenciais inválidas!')
        }
        const [authType, authValue] = auth.split(' ')
        if (authType === 'Basic'){
            let buff = Buffer.from(authValue, 'base64');
            let [email, senha] = buff.toString('ascii').split(':');
            
            const foundUser = await searchByEmail(email)
            if(foundUser == null){
                return response.status(400).json("usuário não encontrado")
            }

            var hash = crypto.createHash('md5').update(senha + salt).digest('hex');

            if(foundUser.password != hash){
                return response.status(401).json("senha incorreta")
            }
            
        }


        if (authType === 'Bearer'){
            
        }
        console.log(`\n\n Auth Middleware <(0-0)> -> ${authType}->${authValue}\n\n`)
        
        return next()
}