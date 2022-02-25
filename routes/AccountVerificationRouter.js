import express from "express";
import handlebars from "handlebars";
import fs from "fs";
import sendMail from "../sender/EmailSender.js";
import {EMAIL_PROPERTIES} from "../NotificationConstant.js";

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

const AccountVerificationRouter = express.Router();


AccountVerificationRouter.post("/", async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const accountVerifiedLink = req.body.accountVerifiedLink

    readHTMLFile(EMAIL_PROPERTIES.ACCOUNT_VERIFICATION.templateDirectory, function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            username: username,
            link: accountVerifiedLink,
        };
        const htmlFileToSend = template(replacements);

        try {
            sendMail(email, htmlFileToSend, EMAIL_PROPERTIES.ACCOUNT_VERIFICATION.subject)
            res.status(200).send("Email sent successfully")
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

export default AccountVerificationRouter;