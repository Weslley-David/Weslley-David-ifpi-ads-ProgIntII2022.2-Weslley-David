import { EmailValidator } from "../bd/tables/emailValidator";
import { updateUserActivated } from "./userOp";

const createEmailValidator = async (code: string, email: string, validity: string) => {
    await EmailValidator.create({ code: code, email: email, validity: validity })
}

const readAndVerifyEmailValidator = async (email: string, code: string) => {
    const readValidator = await EmailValidator.findOne({
        where: {
            email: email
        }
    })

    let timenow = new Date().getTime()

    if (!readValidator || readValidator.code != code || Number(readValidator.validity) < timenow) {
        return false
    } else {
        updateUserActivated(email)
        return true
    }
}
export { createEmailValidator, readAndVerifyEmailValidator }