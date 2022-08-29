const UserToken = require('../database/tables/userToken')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT
export const generateNewToken = async (id: number) => {
    const token = jwt.sign({ "id": id }, secret, { expiresIn: 900 })
    const reftoken = jwt.sign({ "id": id }, secret, { expiresIn: "3d" })

    //salvando reftoken no banco de dados
    await UserToken.create({ uid: id, refToken: reftoken })

    return ({ "auth": true, reftoken, token })
}