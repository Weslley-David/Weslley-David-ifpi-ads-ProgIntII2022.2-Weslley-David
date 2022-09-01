const SequelizeUserToken = require('sequelize');
import { sequelize } from "../db";

const Token = sequelize.define('token', {
    id:{
        type: SequelizeUserToken.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uid:{
        type: SequelizeUserToken.INTEGER,
        allowNull: false
    },
    refToken:{
        type: SequelizeUserToken.STRING,
        allowNull: false
    }
})

module.exports = Token