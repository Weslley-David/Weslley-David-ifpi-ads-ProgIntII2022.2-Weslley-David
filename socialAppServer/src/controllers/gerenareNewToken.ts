const UserToken = require('../database/tables/userToken')
export const generateNewToken = async (refresh: any) =>{
    const foundtoken = await UserToken.findOne({
        where: {
            refToken: refresh
        }
    })

    if(foundtoken != null){
        
    }
}