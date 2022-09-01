const Sequelize = require('sequelize');
require("dotenv").config();
console.log()
export const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER_DATABASE_NAME, process.env.USER_DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
})