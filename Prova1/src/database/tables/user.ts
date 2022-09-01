const SequelizeUser = require('sequelize');
import { sequelize } from "../db";

const User = sequelize.define('user', {
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
    phone:{
        type: SequelizeUser.STRING,
        allowNull: false
    },
    password:{
        type: SequelizeUser.STRING,
        allowNull: false
    },
    activated:{
        type: SequelizeUser.BOOLEAN,
        allowNull: false
    }
})

module.exports = User