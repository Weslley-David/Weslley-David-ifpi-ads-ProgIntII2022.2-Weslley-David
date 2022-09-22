import { createPairOfTokens } from "./pairOfTokenOperations"
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT
export const tokenGenerator = async (email: string) => {
    const timeElapsed = String(new Date().getTime())
    const acetoken = jwt.sign({ "email": email, "createdTime": timeElapsed }, secret, { expiresIn: 900 })
    const reftoken = jwt.sign({ "email": email, "createdTime": timeElapsed }, secret, { expiresIn: "3d" })

    //salvando reftoken no banco de dados
    await createPairOfTokens(email, reftoken, acetoken, timeElapsed)

    return ({ "auth": true, reftoken, acetoken })
}