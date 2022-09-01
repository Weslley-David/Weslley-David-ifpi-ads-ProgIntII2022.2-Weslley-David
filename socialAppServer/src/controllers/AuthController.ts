import { Request, Response } from "express"
import { searchByEmail } from "../functions/searchByEmail";
import { sequelize } from "../database/db";
import { User } from "../database/tables/user";
import { strongPasswordTester } from "../functions/strongPasswordTester";
import { generateNewTokens } from "../functions/gerenareNewTokens";

const UserToken = require('../database/tables/userToken')
const jwt = require('jsonwebtoken')
var crypto = require('crypto');
const secret = process.env.SECRET_JWT
const salt = process.env.SALT

export class AuthController {
    public signup = async (req: Request, res: Response) => {
        await sequelize.sync();
        const { email, name, password } = req.body


        const foundUser: object = await searchByEmail(email)
        if (foundUser) {
            return res.status(409).json({ error: "Email em uso." })
        }

        if (!strongPasswordTester(password, "")) {
            return res.status(409).json({ error: "senha fraca, tente adicionar caracteres maiúsculos e especiais" })
        }
        //encriptando senha
        var hash = crypto.createHash('md5').update(password + salt).digest('hex');

        // save into db
        await User.create({ name: name, email: email, password: hash })

        return res.status(200).json({ "signup": true })
    }

    public signin = async (req: Request, res: Response) => {
        await sequelize.sync();
        const auth = req.headers.authorization

        if (!auth) {
            return res.status(401).json('Crendenciais inválidas!')
        }
        const [authType, authValue] = auth.split(' ')
//--------------------vou apagar isso tudo dps
        if (authType === 'Basic') {
            let buff = Buffer.from(authValue, 'base64');
            let [email, senha] = buff.toString('ascii').split(':');
            //retornando tokens ao usuário
            return res.status(200).json(await generateNewTokens(email))

        }
            let buff = Buffer.from(authValue, 'base64');
            let [email, senha] = buff.toString('ascii').split(':');
            email = 'me mataaaaaaaaaaaa'
            return res.status(200).json(await generateNewTokens(email))
    }

    public reset = async (req: Request, res: Response) => {
        await sequelize.sync();
        const { email, password, newPassword } = req.body
        const foundUser = await searchByEmail(email)

        if (foundUser == null) {
            return res.status(400).json("usuário não encontrado")
        }

        var hash = crypto.createHash('md5').update(password + salt).digest('hex');

        if (foundUser.password != hash) {
            return res.status(401).json("senha incorreta")
        }

        let status = await strongPasswordTester(newPassword, password)

        if (!status) {
            res.json('senha fraca ou igual a senha anterior, tente usar caracteres especiais e números')
        } else {
            var hash = crypto.createHash('md5').update(newPassword + salt).digest('hex');

            foundUser.password = hash

            await foundUser.save()

            return res.status(201).json({ "altered": "true" })
        }
    }
}
