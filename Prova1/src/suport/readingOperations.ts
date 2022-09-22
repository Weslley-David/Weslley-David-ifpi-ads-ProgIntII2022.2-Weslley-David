import { Reading } from "../bd/tables/reading"
const createReading = async (email: string ,title: string, status: string, atualpage: number) => {
    await Reading.create({title: title, email: email, status: status, atualpage: atualpage})
}


const readReadings = async ( email: string) =>{
    const readReading = await Reading.findAll({
        where: {
            title: email
        }
    })
    return readReading
}
export { createReading, readReadings}