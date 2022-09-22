import { createReading, readReadings } from "../entityOperations/readingOp"

const jwt = require('jsonwebtoken')
var secret = process.env.SECRET_JWT

export class ReadingContoller {
    public add = async (req: any, res: any) => {
        const { title, status, atualpage } = req.body
        const auth = req.headers.authorization
        const [authType, authValue] = auth.split(' ')

        if (authType === 'Bearer') {
            if (!authValue) {
                return res.status(401).json('Crendenciais inválidas!')
            } else {

                jwt.verify(authValue, secret, async (err: Error, decoded: any) => {
                    if (err) {
                        if (err) return res.status(401).end();
                    } else {

                        await createReading(decoded.email, title, status, atualpage)
                        return res.status(200).json({ "info": "sucess" })
                    }
                })
            }
        }
    }
    public list = async (req: any, res: any) => {
        const auth = req.headers.authorization
        const [authType, authValue] = auth.split(' ')

        if (authType === 'Bearer') {
            if (!authValue) {
                return res.status(401).json('Crendenciais inválidas!')
            } else {

                jwt.verify(authValue, secret, async (err: Error, decoded: any) => {
                    if (err) {
                        if (err) return res.status(401).end();
                    } else {
                        return res.status(200).json(await readReadings(decoded.email))
                    }
                })
            }
        }
    }
}