const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const cors= require('cors');

router.use(cors());

router.get('/', (req,res)=>{
    res.redirect('/');
})
router.get('/getAll',  UserController.getAll);
router.get('/getUser/:id', UserController.getByID);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', UserController.profile);

module.exports=router;