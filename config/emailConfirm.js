const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nickhun0714@gmail.com',
        pass: 'sony0714',

    }
});

var mailOptions = {
    from: 'nickhun0714@gmail.com',
    to: 'zoli19950714@gmail.com',
    subject: 'Confirm your account',
    text: ''
};

var sendEmail = transporter.sendMail(mailOptions, (err,data)=>{
    if(err){
        console.log('Error occurs: ',err);
    }   else{
        console.log('Email sent');
    }
});

module.exports={mailOptions, sendEmail}