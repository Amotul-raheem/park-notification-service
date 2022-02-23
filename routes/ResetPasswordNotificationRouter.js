import express from "express";
import handlebars from "handlebars";
import fs from "fs";
import sendMail from "../sender/EmailSender.js";
import {EMAIL_PROPERTIES} from "../NotificationConstant.js";

const ResetPasswordNotificationRouter = express.Router();

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

ResetPasswordNotificationRouter.post("/", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const resetPasswordLink = req.body.resetPasswordLink

    readHTMLFile(EMAIL_PROPERTIES.RESET_PASSWORD.templateDirectory, function (err, html) {

        const template = handlebars.compile(html);
        const replacements = {
            username: username, link: resetPasswordLink, email: email
        };
        const htmlFileToSend = template(replacements);

        try {
            sendMail(email, htmlFileToSend, EMAIL_PROPERTIES.RESET_PASSWORD.subject)
            res.status(200).send("Email sent successfully")
        } catch (error) {
            res.status(500).send(error);
        }
    });
});


export default ResetPasswordNotificationRouter
