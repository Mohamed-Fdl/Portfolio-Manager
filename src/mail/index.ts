import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

type MailType = {
    subject : string,
    html : string | {path : string}
}

//load env variable
dotenv.config()



function Mailer(type : MailType,to : string){

    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject: type.subject,
        html: type.html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    }); 
}

export {Mailer}

