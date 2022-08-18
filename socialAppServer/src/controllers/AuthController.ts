import { Request, Response } from "express"
var db = require('../database/db')
const User = require('../database/tables/user');
var crypto = require('crypto');


export class AuthController2{
    public signup = async (req: Request, res: Response) => {
        await db.sync();
        const {email, name, password} = req.body
        var hash = crypto.createHash('md5').update(password + "uwu").digest('hex');
        //console.log(hash); // 9b74c9897bac770ffc029102a200c5de
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })
        /*const foundUser = await this.users.findOne<User>({
            email
        })*/

        if (foundUser){
            return res.status(409).json({error: "Já existe um usuário com este email!"})
        }
    
        // save into db
        /*const result = await this.users.insertOne(user)*/

        const result = await User.create({
            name: name,
            email: email,
            password: hash
        })
    
        return res.status(200).json(result)
    }

    public signin = async (req: Request, res: Response) => {
        await db.sync();
        const {email, password} = req.body
        var hash = crypto.createHash('md5').update(password + "uwu").digest('hex');
        const foundUser = await User.findOne({
            where: {
                email: email
            }
        })
        console.log(foundUser)
        if(foundUser == null){
            return res.status(200).json("usuário não encontrado")
        }
        if(foundUser.password != hash){
            return res.status(200).json("senha incorreta")
        }
    
        return res.status(200).json({
            "id": foundUser.id,
            "email": foundUser.email,
            "name": foundUser.name 
        })
    }
}
