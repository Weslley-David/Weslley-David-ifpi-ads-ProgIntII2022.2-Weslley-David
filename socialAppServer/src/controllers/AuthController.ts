import { Request, Response } from "express"
import { searchByEmail } from "../functions/searchByEmail";
import { sequelize } from "../database/db";
import { User } from "../database/tables/user";
import { verifyNewPassword } from "../functions/verifyNewPassword";
import { generateNewToken } from "../functions/gerenareNewTokens";
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

        //encriptando senha
        var hash = crypto.createHash('md5').update(password + salt).digest('hex');

        // save into db
        await User.create({ name: name, email: email, password: hash })

        return res.status(200).json({ "signup": true })
    }

    public signin = async (req: Request, res: Response) => {
        await sequelize.sync();
        const { email } = req.body
        const foundUser = await searchByEmail(email)
        return res.status(200).json(await generateNewToken(foundUser.id))
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

        let status = await verifyNewPassword(newPassword, password)

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
