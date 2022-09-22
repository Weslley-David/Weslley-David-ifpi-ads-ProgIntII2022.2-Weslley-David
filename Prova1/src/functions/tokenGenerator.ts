import { createPairOfTokens } from "../entityOperations/pairOfTokenOp"
import { codeGenerator } from "./codeGenerator"

const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

export const tokenGenerator = async (email: string) => {
    const code = await codeGenerator()
    const timeElapsed = String(new Date().getTime())
    const acetoken = jwt.sign({ "email": email, "createdTime": timeElapsed, "code": code}, secret, { expiresIn: 900 })
    const reftoken = jwt.sign({ "email": email, "createdTime": timeElapsed, "code": code}, secret, { expiresIn: "3d" }) 

    //salvandotoken no banco de dados
    await createPairOfTokens(email, reftoken, acetoken, timeElapsed, code)
    return ({ "auth": true, reftoken, acetoken })
}