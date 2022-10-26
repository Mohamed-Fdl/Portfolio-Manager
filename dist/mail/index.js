"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
//load env variable
dotenv_1.default.config();
function Mailer(type, to) {
    var transporter = nodemailer_1.default.createTransport({
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
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.Mailer = Mailer;
