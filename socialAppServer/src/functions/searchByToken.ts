import { Token } from "../database/tables/userToken"
export const searchByToken = async (token: string) => {
    const foundToken = await Token.findOne({
        where: {
            refToken: token
            ,
            $or: [
                {
                    FirstName:
                    {
                        $eq: "John"
                    }
                }
            ]
        }
    })
    return foundToken
}