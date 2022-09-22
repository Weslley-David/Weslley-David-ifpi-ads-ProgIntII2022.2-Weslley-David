const SequelizeUser = require('sequelize');
import { dbconnection } from "../connection";

export const User = dbconnection.define('user', {
    id: {
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    uid: {
        type: SequelizeUser.UUID,
        defaultValue: SequelizeUser.UUIDV4
    },
    name: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    email: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    phone: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    password: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    activated: {
        type: SequelizeUser.BOOLEAN,
        allowNull: false
    }
})