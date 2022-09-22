const SequelizeUser = require('sequelize');
import { dbconnection } from "../connection";

export const EmailValidator = dbconnection.define('emailvalidator', {
    id: {
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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