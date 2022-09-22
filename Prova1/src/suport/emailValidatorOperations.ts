import { EmailValidator } from "../bd/tables/emailValidator";
import { readUserByEmail, updateUserActivated } from "./userOperations";
const createEmailValidator = async (code: string, email: string, validity: string) => {
    await EmailValidator.create({ code: code , email: email, validity: validity})
}

const readEmailValidator = async (email: string, code: string) => {
    const readValidator = await EmailValidator.findOne({
        where: {
            email: email
        }
    })

    let timenow = new Date().getTime()

    if(!readValidator || readValidator.code != code || Number(readValidator.validity) < timenow){
        return false
    }else{
        updateUserActivated(email)
        return true
    }
}
export { createEmailValidator, readEmailValidator}