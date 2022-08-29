import { Router } from 'express'
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

const tokenRoutes = Router()

tokenRoutes.post('/new', (req, res) => {
    const refToken = req.headers['x-refresh-token']
    
    console.log(refToken)
    jwt.verify(refToken, secret, (err: Error, decoded: any) => {
        if (err) return res.status(401).end();

        const token = jwt.sign({"id": "token"}, secret, {expiresIn: 900})
        const reftoken = jwt.sign({"id": "refToken"}, secret, {expiresIn: "3d"})
        return res.status(200).json({
            auth : true,
            token,
            reftoken
        })
    })
    res.json("function not called")
}
)

export default tokenRoutes