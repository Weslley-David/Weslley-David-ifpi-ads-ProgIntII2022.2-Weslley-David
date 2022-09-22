import { User } from "../bd/tables/user"
const createUser = async (name: string, email: string, password: string) => {
    await User.create({ name: name, email: email, phone: "", password: password, activated: false })
}

const readUserByEmail = async (email: string) => {
    const readUser = await User.findOne({
        where: {
            email: email
        }
    })
    return readUser
}

const readUserByPhone = async (phone: string) => {
    const readUser = await User.findOne({
        where: {
            email: phone // acho que isso está errado e vou ver depois
        }
    })
    return readUser
}

const updateUserActivated = async (email: string) => {
    const readUser = await User.findOne({
        where: {
            email: email
        }
    })

    readUser.activated = !readUser.activated;
    await readUser.save()

    return readUser
}

const updatePhoneUserActivated = async (email: string, phone: string) => {
    const readUser = await User.findOne({
        where: {
            email: email
        }
    })

    readUser.phone = phone;
    await readUser.save()

    return readUser
}


export { createUser, readUserByEmail, readUserByPhone, updateUserActivated, updatePhoneUserActivated}