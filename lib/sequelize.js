const {Sequelize} = require('sequelize');
const config = require('../config/config');

  const sequelize = new Sequelize({
    host: config.db_host,
    database: config.db_name,
    username: config.db_user,
    password: config.db_password,
    //dialect: 'mysql',
    dialect: 'postgres',
    logging: console.log
  })


module.exports = sequelize;
