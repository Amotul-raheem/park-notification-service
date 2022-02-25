import express from "express";
import handlebars from "handlebars";
import sendMail from "../sender/EmailSender.js";
import {EMAIL_PROPERTIES} from "../NotificationConstant.js";
import readHTMLFile from "../Utilities/ReadHtmlFile.js";

const ResetPasswordNotificationRouter = express.Router();

ResetPasswordNotificationRouter.post("/", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const resetPasswordLink = req.body.Link

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
