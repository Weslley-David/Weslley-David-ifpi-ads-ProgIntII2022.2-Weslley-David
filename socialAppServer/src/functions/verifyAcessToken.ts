import { NextFunction, Request, Response } from "express"
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT
export function verifyAcessToken(req: Request, res: Response, next: NextFunction){
    const token = req.headers['x-acess-token']
    const refToken = req.headers['x-refresh-token']
    jwt.verify(token, secret, (err: Error, decoded: any) =>{
        if(err){
            if(err) return res.status(401).end();
        }

        console.log(req)
        req = decoded.id
        console.log(req)
        next();
    })
}