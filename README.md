# e_your_menu_v1.0.0

--DB--

<h1>EYM beta db v1.0.1</h1>

<p><b>User query</b></p>

CREATE TABLE User(
User_ID INT(6) AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(40),
`Username` VARCHAR(50) not null,
Password VARCHAR(250) not null,
Email VARCHAR(30) not null,
Role_ID int(2) default 1,
Zipcode VARCHAR(100),
Confirm bool default 0,
Newsletter bool default 0,
Reg_date timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key(Role_ID) references Role(Role_ID)
)

<p><b>Role_ID query</b></p>
create table Role(
Role_ID int NOT NULL auto_increment primary key,
Name varchar(30)
)



<h3>-------------------------------------------</h3>
<h1>E-your Menu Beta v1.0.0</h1>

<p><b>This sofware will contain an app for mobiles, too.</b></p>

<h2>Developments with MEAN stack:</h2>

<h3>Backend side</h3>
<p>Currently used technologies:</p>
<ul>
  <li>NodeJs</li>
  <li>Express</li>
  <li>MySQL</li>
</ul>

<b>server.js</b>
I set the requirements below:
- const express = require('express');
- const path = require('path');
- const port = process.env.PORT || 3010;   // Your backend server port number
- const bodyParser = require('body-parser');
- const cors = require('cors');
- const logger = require('morgan');   // Developer tool, get information in the console log
- const dbConn = require('./config/dbMySQL');  
- const app = express();    // With express you can set up the server easily way



<hr>
<h3>Frontend side</h3>
<p>Currently used technologies:</p>
<ul>
  <li>Angular</li>
</ul>
