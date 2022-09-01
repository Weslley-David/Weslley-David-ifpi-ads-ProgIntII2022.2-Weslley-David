const SequelizeUser = require('sequelize');
import { sequelize } from "../db";

export const activationcode = sequelize.define('activation', {
    id:{
        type: SequelizeUser.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    datacriacao:{
        type: SequelizeUser.DATE,
        allowNull: false
    },
    email:{
        type: SequelizeUser.STRING,
        allowNull: false
    }
    
    ,
    code:{
        type: SequelizeUser.STRING,
        allowNull: false
    }
})
