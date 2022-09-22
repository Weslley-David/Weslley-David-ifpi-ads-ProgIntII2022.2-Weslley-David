import { readUserByEmail, createUser } from '../entityOperations/userOp'
import { createPhoneValidator } from '../entityOperations/phoneValidatorOp'
import { createEmailValidator } from '../entityOperations/emailValidatorOp';
import { codeGenerator } from '../functions/codeGenerator'
import { tokenGenerator } from '../functions/tokenGenerator';

var crypto = require('crypto');
var salt = process.env.SALT

export class UserContoller {
    public signup = async (req: any, res: any) => {
        const { name, email, password, phone } = req.body

        let foundUser = await readUserByEmail(email)

        if (foundUser) {
            res.status(409).json({ "err": "user already exists" })
        } else {
            let hash = crypto.createHash('md5').update(password + salt).digest('hex');
            await createUser(name, email, hash)

            let code: string = codeGenerator()
            let phonecode: string = codeGenerator()
            let validity = String(new Date().getTime() + 7200000)

            createEmailValidator(code, email, validity)
            createPhoneValidator(phone, email, validity, phonecode)

            console.log(`\n\n\n http://localhost:3007/activate/email/?email=${email}&code=${code} \n\n\n`)
            console.log(`http://localhost:3007/activate/phone/?phone=${phone}&code=${phonecode}&email=${email} \n\n\n`)

            res.status(200).json({ "info": "a validation link has been sent to you by email" })
        }
    }

    public signin = async (req: any, res: any) => {
        const auth = req.headers.authorization

        if (!auth) {
            return res.status(401).json({ "err": "Invalid Credentials" })
        }

        const [authType, authValue] = auth.split(' ')

        if (authType === 'Basic') {
            let buff = Buffer.from(authValue, 'base64');
            let [email, password] = buff.toString('ascii').split(':');
            let foundUser = await readUserByEmail(email)
            let hash = crypto.createHash('md5').update(password + salt).digest('hex');

            console.log(foundUser)
            if (!foundUser || !foundUser.activated || hash !== foundUser.password) {
                res.status(401).json({ "err": "user not found or invalid password " })
            } else {
                res.status(200).json(await tokenGenerator(email))// foundUser.uid
            }


        } else {
            return res.status(401).json({ "err": "Invalid authentication form." })
        }
    }
}