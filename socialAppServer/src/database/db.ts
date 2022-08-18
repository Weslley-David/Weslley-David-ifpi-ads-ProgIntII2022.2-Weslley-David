const Sequelize = require('sequelize');
require("dotenv").config();
console.log()
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER_DATABASE_NAME, process.env.USER_DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
    /*,port: 3306*/
})

module.exports = sequelize;