import { Token } from "../database/tables/userToken"
export const searchByEmail = async (token : string) =>{
    const foundToken = await Token.findOne({
        where: {
            refToken: token
        }
    })
    return foundToken
}