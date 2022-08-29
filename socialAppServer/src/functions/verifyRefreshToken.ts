import { generateNewToken } from "./gerenareNewTokens"
import { NextFunction, Request, Response } from "express"
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT
export function verifyAcessToken(){
    

}