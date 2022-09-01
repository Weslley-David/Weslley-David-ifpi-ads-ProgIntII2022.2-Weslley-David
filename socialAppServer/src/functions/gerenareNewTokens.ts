const UserToken = require('../database/tables/userToken')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT
export const generateNewTokens = async (email: string) => {
    const timeElapsed = String(Date.now());
    const token = jwt.sign({ "email": email, "createdTime": timeElapsed }, secret, { expiresIn: 900 })
    const reftoken = jwt.sign({ "email": email, "createdTime": timeElapsed }, secret, { expiresIn: "3d" })

    //salvando reftoken no banco de dados
    await UserToken.create({ email: email, refToken: reftoken, aceToken: token, created: timeElapsed})

    return ({ "auth": true, reftoken, token })
}