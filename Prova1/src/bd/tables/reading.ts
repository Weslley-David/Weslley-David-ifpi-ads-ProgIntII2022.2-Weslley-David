const SequelizeUser = require('sequelize');
import { dbconnection } from "../connection";

export const Reading = dbconnection.define('reading', {
    id: {
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    email: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    atualpage: {
        type: SequelizeUser.INTEGER,
        allowNull: false
    },
    status: {
        type: SequelizeUser.STRING,
        allowNull: false
    }
})