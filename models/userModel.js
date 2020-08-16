const Sequelize = require('sequelize');
const dbConn = require('../config/dbMySQL');

const User = dbConn.sequelize.define(
    `customer`, {
    User_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING
    },    
    Username: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Zipcode: {
        type: Sequelize.STRING
    },
    Confirm: {
        type: Sequelize.BOOLEAN,
        defaultValue : 0
    },
    Reg_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    Newsletter: {
        type: Sequelize.BOOLEAN,
        defaultValue : 0
    },
},
    {
        timestamps: 0
    })

module.exports = User;