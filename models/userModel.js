const Sequelize = require('sequelize');
const dbConn = require('../config/dbMySQL');

const User = dbConn.sequelize.define(
    `user`, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    reg_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
    {
        timestamps: 0
    })

module.exports = User;