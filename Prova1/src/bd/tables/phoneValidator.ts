const SequelizeUser = require('sequelize');
import { dbconnection } from "../connection";

export const PhoneValidator = dbconnection.define('phonevalidator', {
    id: {
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phone: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    email: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    code: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    validity: {
        type: SequelizeUser.STRING,
        allowNull: false
    }
})