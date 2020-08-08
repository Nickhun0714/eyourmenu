const express = require('express');
const path = require('path');
const port = process.env.PORT || 3010; //Port number
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');   //developer tool, console logban tájékoztat
const dbConn = require('./config/dbMySQL');
const app = express(); 
const passport = require('passport');


//Db connection test
dbConn.sequelize.authenticate()
    .then(()=> console.log('Database connected correctly with sequelize, ~mysql~'))
    .catch(err => console.log('error with connection: ',err));
    
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('short')); //Betöltési idejét mutatja a console logban. (combined, dev is létezik)

app.get('/', (req,res)=>{
    res.send("<h1>E-your menu backend server</h1>")
})

//Static folder
app.use(express.static(path.join(__dirname, `public`)));


//User Routes
var UserRoute = require('./routes/userRoute');
app.use('/api', UserRoute);


//Error page
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public/index.html'));
    res.send("ERROR");
  });



//Start server
app.listen(port, ()=>{
    console.log('Server is running on port '+port);
});