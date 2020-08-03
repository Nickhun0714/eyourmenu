const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,{
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    operatorAliases: 0,
    multipleStatements: 1,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        freezeTableName: 1
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;