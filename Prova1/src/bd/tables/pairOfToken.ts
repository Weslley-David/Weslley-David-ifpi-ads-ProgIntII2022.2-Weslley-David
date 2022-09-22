const SequelizeUser = require('sequelize');
import { dbconnection } from "../connection";

export const PairOfToken = dbconnection.define('pairoftoken', {
    id: {
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: SequelizeUser.STRING,
        allowNull: false,
    },
    acekey: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    refkey: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    created: {
        type: SequelizeUser.STRING,
        allowNull: false
    },
    code: {
        type: SequelizeUser.STRING,
        allowNull: false
    }
})