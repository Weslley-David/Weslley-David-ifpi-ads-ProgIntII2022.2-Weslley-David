const SequelizeUserToken = require('sequelize');
import { sequelize } from "../db";

export const Token = sequelize.define('token', {
    id:{
        type: SequelizeUserToken.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: SequelizeUserToken.STRING,
        allowNull: false
    },
    refToken:{
        type: SequelizeUserToken.STRING,
        allowNull: false
    },
    aceToken:{
        type: SequelizeUserToken.STRING,
        allowNull: false
    },
    createdTime:{
        type: SequelizeUserToken.STRING,
        allowNull: false,
    }
})

module.exports = Token