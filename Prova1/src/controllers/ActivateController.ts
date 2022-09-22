import { readAndVerifyEmailValidator } from "../entityOperations/emailValidatorOp"
import { updateUserActivated } from "../entityOperations/userOp"
import { readAndVerifyPhoneValidator } from "../entityOperations/phoneValidatorOp"

export class ActivateContoller {
    public email = async (req: any, res: any) => {
        let qemail = String(req.query.email)
        let qcode = String(req.query.code)

        let valid = await readAndVerifyEmailValidator(qemail, qcode)
        console.log(valid)
        if (valid) {
            await updateUserActivated(qemail)
            res.status(200).json({ "info": "validated" })
        } else {
            res.status(200).json({ "err": "unvalid user or code" })
        }
    }

    public phone = async (req: any, res: any) => {
        let qemail = String(req.query.email)
        let qphone = String(req.query.phone)
        let qcode = String(req.query.code)

        let valid = await readAndVerifyPhoneValidator(qemail, qphone, qcode)
        console.log(valid)
        if (!valid) {
            res.status(200).json({ "info": "phone added" })
        } else {
            res.status(401).json({ "info": "invalid phone or code" })
        }
    }
}