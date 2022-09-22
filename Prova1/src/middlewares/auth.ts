import { NextFunction, Request, Response } from "express";
import { readAndValidateAceToken } from "../entityOperations/pairOfTokenOp";

const jwt = require('jsonwebtoken')
var secret = process.env.SECRET_JWT


export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

    const auth = request.headers.authorization

    if (!auth) {
        return response.status(401).json('Crendenciais inválidas!')
    }
    const [authType, authValue] = auth.split(' ')

    if (authType === 'Bearer') {
        if (!authValue) {
            return response.status(401).json('Crendenciais inválidas!')
        } else {

            jwt.verify(authValue, secret, async (err: Error, decoded: any) => {
                if (err) {
                    if (err) return response.status(401).end();
                } else {
                    let status = await readAndValidateAceToken(decoded.email, decoded.createdTime, decoded.code)
                    console.log(status, "jgklafgjldkj")
                    if (!status) {
                        return response.status(401).json({ "err": "token revogado bahhhh" })
                    }
                }
            })
        }
    }
    console.log(`\n\n Auth Middleware <(0-0)> -> ${authType}->${authValue}\n\n`)

    return next()
}