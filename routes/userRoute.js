const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors= require('cors');
router.use(cors());


function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token ==='null'){
        return res.status(401).send('Unauthorized request'); 
    }
    let payload = jwt.verify(token, process.env.SECRET_KEY);
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject
    next()
}


router.get('/', (req,res)=>{
    res.redirect('/');
})
//verifyToken
router.get('/getAll',  UserController.getAll);
router.get('/getUser/:id', UserController.getByID);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', UserController.profile);
//router.get('/authenticate', UserController.authenticate);

module.exports=router;