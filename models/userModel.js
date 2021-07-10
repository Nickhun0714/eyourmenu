const Sequelize = require('sequelize');
const dbConn = require('../config/dbMySQL');

const User = dbConn.sequelize.define(
    `user`, {
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
        type: Sequelize.STRING,
        required:true,
        unique:true
       // match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']

    },
    Role_ID:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    Zipcode: {
        type: Sequelize.STRING
    },
    Confirm: {
        type: Sequelize.BOOLEAN,
        defaultValue : 0
    },
    Newsletter: {
        type: Sequelize.BOOLEAN,
        defaultValue : 0
    },
    Reg_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

},
    {
        timestamps: 0
    })

module.exports = User;