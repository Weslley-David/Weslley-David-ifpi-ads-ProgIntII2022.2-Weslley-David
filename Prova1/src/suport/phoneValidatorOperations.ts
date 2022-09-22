import { PhoneValidator } from "../bd/tables/phoneValidator"
import { readUserByPhone, updatePhoneUserActivated } from "./userOperations"

const createPhoneValidator = async (phone: string, email: string, validity: string, code: string) => {
    let verifyer = await readUserByPhone(phone)
    if (!verifyer) {
        await PhoneValidator.create({ phone: phone, email: email, code: code, validity: validity })
    }
}

const readAndVerifyPhoneValidator = async (email: string, phone: string, code: string) => {
    let verifyer = await readUserByPhone(phone)
    if(!verifyer){
        const readValidator = await PhoneValidator.findOne({
            where: {
                phone: phone,
                email: email
            }
        })
        console.log(readValidator.code , code, email, phone, "\n\n\n\n\n")
        if(readValidator.code == code){
            await updatePhoneUserActivated(email, phone)
            return true
        }else{
            return false
        }
    }
}
export { createPhoneValidator, readAndVerifyPhoneValidator}