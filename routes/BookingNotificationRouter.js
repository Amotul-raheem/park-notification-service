import express from "express";
import readHTMLFile from "../Utils/FileUtils.js";
import {EMAIL_PROPERTIES} from "../NotificationConstant.js";
import handlebars from "handlebars";
import sendMail from "../sender/EmailSender.js";


const bookingNotificationRouter = express.Router();


bookingNotificationRouter.post("/", async (req, res) => {
    const username = req.body.username
    const checkIn = req.body.checkIn
    const checkOut = req.body.checkOut
    const space_name = req.body.space_name
    const email = req.body.email

    readHTMLFile(EMAIL_PROPERTIES.BOOKING.templateDirectory, function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            username: username,
            checkIn: checkIn,
            checkOut: checkOut,
            space_name: space_name
        };
        const htmlFileToSend = template(replacements);

        try {
            sendMail(email, htmlFileToSend, EMAIL_PROPERTIES.BOOKING.subject)
            res.status(200).send("Email sent successfully")
        } catch (error) {
            res.status(500).send(error);
        }
    });
})

export default bookingNotificationRouter