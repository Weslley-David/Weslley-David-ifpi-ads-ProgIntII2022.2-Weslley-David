const jwt = require('jsonwebtoken')
var secret = process.env.SECRET_JWT

export const verifyToken = async(auth: string) =>{
        jwt.verify(auth, secret, (err: Error, decoded: any) => {
            if (decoded) {
                let email = decoded.email
                console.log("\n\n\n\n\n\n\n",email)
                return email
            }
        })
}