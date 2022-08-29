const SequelizeUser = require('sequelize');
const database1 = require('../db');

const User = database1.define('user', {
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