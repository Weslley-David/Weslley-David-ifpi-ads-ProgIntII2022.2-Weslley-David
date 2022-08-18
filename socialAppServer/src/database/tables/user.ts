const SequelizeUser = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    id:{
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: SequelizeUser.STRING,
        allowNull: false
    },
    email:{
        type: SequelizeUser.STRING,
        allowNull: false
    },
    password:{
        type: SequelizeUser.STRING,
        allowNull: false
    }
})

module.exports = User