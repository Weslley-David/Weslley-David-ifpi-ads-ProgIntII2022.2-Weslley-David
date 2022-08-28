const SequelizeUserToken = require('sequelize');
const database = require('../db');

const Token = database.define('token', {
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