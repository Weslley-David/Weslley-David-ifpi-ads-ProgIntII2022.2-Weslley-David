import { PairOfToken } from "../bd/tables/pairOfToken";

const createPairOfTokens = async(email: string, reftoken: string, acetoken: string, timeElapsed:string) =>{
    await PairOfToken.create({ email: email, refkey: reftoken, acekey: acetoken, created: timeElapsed})
}

const readPairOfTokens = async (email: string) =>{
    const readValidator = await PairOfToken.findOne({
        where: {
            email: email
        }
    })
    return readValidator
}

const readAndValidateAceToken = async (email: string, authValue: string, createdTime: string) =>{
    const readValidator = await PairOfToken.findOne({
        where: {
            email: email,
            authValue: authValue
        }
    })
    if(Number(readValidator.createdTime) + 7200000 > Number(createdTime)){
        return true
    }else{
        return false
    }
}

export { createPairOfTokens, readPairOfTokens, readAndValidateAceToken}