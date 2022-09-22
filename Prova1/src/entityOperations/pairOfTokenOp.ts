import { PairOfToken } from "../bd/tables/pairOfToken";
const SequelizeUser = require('sequelize');
const createPairOfTokens = async (email: string, reftoken: string, acetoken: string, timeElapsed: string, code: string) => {
    console.log('\n\n\n', email, reftoken, acetoken, timeElapsed, code, '\n\n\n')
    await PairOfToken.create({ email: email, refkey: reftoken, acekey: acetoken, created: timeElapsed, code: code })
}

const readPairOfTokens = async (email: string) => {
    const readValidator = await PairOfToken.findOne({
        where: {
            email: email
        }
    })
    return readValidator
}

const readAndValidateAceToken = async (email: string, createdTime: string, code: string) => {
    const readValidator = await PairOfToken.findOne({
        where: {
            email: email
        }
    })

    console.log(typeof(readValidator.code), typeof(code), "me mata aaaaaaaaaaaaaaaaaaaaaaaaaa")
    if (readValidator.code === code) {//Number(readValidator.createdTime) + 7200000 > Number(createdTime) && 
        return true
    } else {
        return false
    }
}

export { createPairOfTokens, readPairOfTokens, readAndValidateAceToken }