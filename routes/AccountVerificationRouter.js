import express from "express";
import handlebars from "handlebars";
import sendMail from "../sender/EmailSender.js";
import {EMAIL_PROPERTIES} from "../NotificationConstant.js";
import readHTMLFile from "../Utils/FileUtils.js";

const accountVerificationRouter = express.Router();

accountVerificationRouter.post("/", async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const accountVerifiedLink = req.body.link

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

export default accountVerificationRouter;