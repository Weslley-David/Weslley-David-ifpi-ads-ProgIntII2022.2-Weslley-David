import { NextFunction, Request, Response } from "express";
import { searchByEmail } from "../functions/searchByEmail";
import { searchByToken } from "../functions/searchByToken";
const jwt = require('jsonwebtoken')
var crypto = require('crypto');
const User = require('../database/tables/user');
const UserToken = require('../database/tables/userToken');
var salt = process.env.SALT
var secret = process.env.SECRET_JWT


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
            if (!authValue){
                return response.status(401).json('Crendenciais inválidas!')
            }

            try{
                jwt.verify(authValue, secret)
                console.log('\n\n\n\n\n\n',authValue,'\n\n\n\n\n\n')
            }catch(err){
                console.log(err)   
                response.status(401).json({"error":"token inválido"})
            }

            jwt.verify(authValue, secret, (err: Error, decoded: any) =>{
                if(err){
                    if(err) return response.status(401).end();
                }
        
                const foundToken = searchByToken(authValue)

                if(foundToken.createdTime < decoded.created){

                }
                
                next();
            })
            /*finally{
                req = decoded.id
                let req = decoded.created
            console.log(req)
            

            if(foundToken.created < authType)
            }*/
            
        }
        console.log(`\n\n Auth Middleware <(0-0)> -> ${authType}->${authValue}\n\n`)
        
        return next()
}