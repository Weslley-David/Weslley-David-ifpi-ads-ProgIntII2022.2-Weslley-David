const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_name', 'user', 'password', {
    dialect: 'postgres',
    host: 'localhost'
    /*,port: 3306*/
})

module.exports = sequelize;