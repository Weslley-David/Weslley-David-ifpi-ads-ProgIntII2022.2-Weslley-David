const SequelizeUserToken = require('sequelize');
const database2 = require('../db');

const Token = database2.define('token', {
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