import { User } from "../database/tables/user"
export const searchByEmail = async (email : string) =>{
    const foundUser = await User.findOne({
        where: {
            email: email
        }
    })
    return foundUser
}