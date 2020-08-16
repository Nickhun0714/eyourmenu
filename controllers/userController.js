const Sequelize = require('sequelize');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const nodemailer = require('nodemailer');


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


    // confirm: (req,res)=>{
    //     var urlToken = req.params.token;
    //     var token = 


    // },
    tokenCompare:(req,res)=>{
        const usrnmTmp = req.body.usnm;

        User.update(
            {Confirm:1},
            {where: {Username: usrnmTmp}}
        )

    },


    register: (req, res) => {
        const today = new Date();
        const userData = {
            Name: req.body.firstname+' '+req.body.lastname,
            Username: req.body.username,
            Password: req.body.password,
            Email: req.body.email,
            Zipcode: req.body.zip,
            Confirm: 0,
            Reg_date: today,
            Newsletter: req.body.newsletter
        }

        User.findOne({
            where: {
                Username: req.body.username
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.Password = hash;

                        User.create(userData)
                            .then(user => {
                                let payload = {subject: user.User_ID}
                                let token = jwt.sign(payload, process.env.SECRET_KEY)
                                let confirmUrl = 'http://localhost:4200/auth/confirmed/'+token
                                
                                //email
                                let transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: process.env.MAIL_FROM,
                                        pass: process.env.MAIL_FROM_PASSWORD,
                                
                                    }
                                });
                                
                                var mailOptions = {
                                    from: process.env.MAIL_FROM,
                                    to: req.body.email,
                                    subject: 'Confirm your account',
                                    html: 'Confirm your account, <br> click this link: <a href="'+confirmUrl+'">Link</a> '
                                };
                                
                                transporter.sendMail(mailOptions, (err,data)=>{
                                    if(err){
                                        console.log('Error occurs: ',err);
                                    }   else{
                                        console.log('Email sent');
                                    }
                                });
                                //email end

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
                Username: req.body.username
            }
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.Password)) {
                        
                        const payload = {
                            ID: user.User_ID,
                            Username: user.Username,
                            Password: user.Password
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
