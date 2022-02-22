import express from "express";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import handlebars from "handlebars";
import fs from "fs";

const authRouter = express.Router();
function readHTMLFile(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            callback(err);
            throw err;
        } else {
            callback(null, html);
        }
    });
}

authRouter.post("/", (req, res) => {
    const User = req.body.username
    const Email = req.body.email
    const Link = req.body.link

    smtpTransport = nodemailer.createTransport(smtpTransport({
        host: process.env.HOST,
        secure: process.env.SECURE,
        port: process.env.PORT,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    }));
    readHTMLFile(__dirname + 'templates/reset-password-notification/reset-password-notification.html', function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            username: User,
            link: Link,
            email: Email
        };
        const htmlFileToSend = template(replacements);
        const mailOptions = {
            from: 'amat@gmail.com',
            to : Email,
            subject : 'test subject',
            html : htmlFileToSend
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                callback(error);
            }
        });
    });
});




export default authRouter
