import { NextFunction, Request, Response } from "express";
var crypto = require('crypto');
const User = require('../database/tables/user');
var salt = process.env.SALT


export async function AuthMiddleware(request: Request, response: Response, next: NextFunction){

        const auth = request.headers.authorization

        if (!auth){
            return response.status(401).json('Crendenciais inválidas!')
        }
        const [authType, authValue] = auth.split(' ')
        if (authType === 'Basic'){
            // decodificar user:senha
            // veriicar no banco de dados se usuario e senha estao ok
            // liberar o não a requisicão
            // let data = 'c3RhY2thYnVzZS5jb20=';
            let buff = Buffer.from(authValue, 'base64');
            let [email, senha] = buff.toString('ascii').split(':');
            console.log('...',email,'...', senha)
            var hash = crypto.createHash('md5').update(senha + salt).digest('hex');
            const foundUser = await User.findOne({
                where: {
                    email: email
                }
            })
            if(foundUser == null){
                return response.status(400).json("usuário não encontrado")
            }

            if(foundUser.password != hash){
                return response.status(401).json("senha incorreta")
            }
            
        }


        if (authType === 'Bearer'){
            // Validar o Token para liberar ou não a requisição
        }
        console.log(auth)
        console.log(`\n\nAuth Middleware <(0-0)> -> ${authType}->${authValue}\n\n`)
        
        return next()
}