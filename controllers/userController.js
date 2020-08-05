const Sequelize = require('sequelize');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
//const passport = require('passport');

module.exports = {

    getAll:  (req, res) => {
        User.findAll()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err)
            })
    },

    getByID: (req, res) => {
        User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                res.json(user);
            })
    },
    create: (req, res) => {
        var usr = new User({
            username: req.body.username,
            password: req.body.password
        })
    },


    register: (req, res) => {
        const today = new Date();
        const userData = {
            username: req.body.username,
            password: req.body.password,
            reg_date: today
        }

        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash;
                        User.create(userData)
                            .then(user => {
                                let payload = {subject: user.id}
                                let token = jwt.sign(payload, process.env.SECRET_KEY)
                                res.status(200).send({token})
                                //res.json({ status: user.username + ' Registered' })
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })

                } else {
                    res.json({ err: 'Username already exists' })
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    },


    profile: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

        User.findOne({
            where: {
                id: decoded.id
            }
        })
            .then(user => {
                if (user) {
                    res.json(user)
                } else {
                    res.send('User does not exist')
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    },

    login: (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        
                        const payload = {
                            id: user.id,
                            username: user.username,
                            password: user.password,
                            reg_date: user.reg_date
                        }
                        //  let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })

                       res.status(200).send({token});
                        // res.json({ "token": token, "username": payload.username, "password": payload.password })
                    } else {
                        res.send('Password is incorrect')
                    }
                } else {
                    res.json({ error: "User does not exist" })
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }

}
