const Sequelize = require('sequelize');
require('dotenv').config();
const MYSQL_DB = process.env.MYSQL_DB;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(
    MYSQL_DB,
    DB_USER,
    DB_PASS,
    {
    dialect:'mysql',host:DB_HOST
})

module.exports=sequelize;
